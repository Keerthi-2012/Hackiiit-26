import { NextResponse } from "next/server";
import { validateCASTicket } from "@/lib/cas";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { isIIITHEmail } from "@/lib/email";

/**
 * Normalize IIIT email
 * - Trust CAS if it already gives full IIIT email
 * - Fallback only if CAS gives username
 */
function normalizeIIITEmail(email) {
  // Remove ALL repeated '@iiit.ac.in'
  let cleaned = email;

  while (cleaned.endsWith("@iiit.ac.in")) {
    cleaned = cleaned.slice(0, -13); // remove '@iiit.ac.in'
  }

  // If it already ends with '.iiit.ac.in' (students/research/faculty), keep it
  if (cleaned.endsWith(".iiit.ac.in")) {
    return cleaned;
  }

  // Otherwise, append once
  return `${cleaned}@iiit.ac.in`;
}


/**
 * Convert email → Proper Name
 * keerthi.seela@students.iiit.ac.in → Keerthi Seela
 */
function formatNameFromEmail(email) {
  const localPart = email.split("@")[0];
  return localPart
    .split(".")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET(req) {
  const ticket = req.nextUrl.searchParams.get("ticket");
  if (!ticket) {
    return new NextResponse("CAS ticket missing", { status: 400 });
  }

  const casUser = await validateCASTicket(ticket);
  if (!casUser) {
    return new NextResponse("CAS validation failed", { status: 401 });
  }

  if (!isIIITHEmail(casUser.email)) {
    return new NextResponse("Unauthorized email", { status: 403 });
  }

  await connectToDatabase();

  // ✅ Normalize email ONCE
  const normalizedEmail = normalizeIIITEmail(casUser.email);

  // 🔍 Find user
  let user = await User.findOne({ email: normalizedEmail });

  // ✅ Decide correct name
  const derivedName =
    casUser.displayName ||
    casUser.cn ||
    formatNameFromEmail(normalizedEmail);

  if (!user) {
    // 🆕 First-time login
    user = await User.create({
      name: derivedName,
      email: normalizedEmail,
    });
  } else {
    // 🔧 Auto-fix legacy bad data
    if (
      user.email.includes("@iiit.ac.in@iiit.ac.in") ||
      user.name.includes("@")
    ) {
      user.email = normalizedEmail;
      user.name = derivedName;
      await user.save();
    }
  }

  // 🔐 Create JWT
  const token = signToken({
    userId: user._id,
  });

  // ➡️ Redirect to dashboard
  const res = NextResponse.redirect(new URL("/dashboard", req.url));

  // 🍪 Set cookie
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
