import { NextResponse } from "next/server";

export async function GET() {
  const CAS_LOGIN_URL = "https://login.iiit.ac.in/cas/login";
  const SERVICE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;


  const redirectUrl = `${CAS_LOGIN_URL}?service=${encodeURIComponent(SERVICE_URL)}`;

  return NextResponse.redirect(redirectUrl);
}
