import { NextResponse } from "next/server";
import { validateCASTicket } from "@/lib/cas";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { isIIITHEmail } from "@/lib/email";

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

  let user = await User.findOne({ email: casUser.email });

  if (!user) {
    user = await User.create({
      name: casUser.name,
      email: casUser.email,
    });
  }

  const token = signToken({
    userId: user._id,
    role: user.role,
  });

  const res = NextResponse.redirect(new URL("/dashboard", req.url));


res.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});



  return res;
}
