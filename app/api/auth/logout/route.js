import { NextResponse } from "next/server";

export async function GET(req) {
  // Redirect to CAS logout, then back to homepage
  const casLogoutUrl = `${process.env.CAS_BASE_URL}/logout?service=${encodeURIComponent(
    new URL("/", req.url).toString()
  )}`;

  const res = NextResponse.redirect(casLogoutUrl);

  // Clear local JWT cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return res;
}
