import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const isCallback = req.nextUrl.pathname.startsWith("/api/auth/callback");

  if (!token && !isCallback) {
    const casLogin =
      `${process.env.CAS_BASE_URL}/login?service=${process.env.CAS_SERVICE_URL}`;
    return NextResponse.redirect(casLogin);
  }

  if (token) {
    try {
      verifyToken(token);
    } catch {
      const casLogin =
        `${process.env.CAS_BASE_URL}/login?service=${process.env.CAS_SERVICE_URL}`;
      return NextResponse.redirect(casLogin);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
