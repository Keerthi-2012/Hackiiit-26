import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(
    "https://login.iiit.ac.in/cas/logout"
  );

  res.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });

  return res;
}
