import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const publicPaths = ["/", "/login", "/api/auth/logout"];
  if (publicPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/query/:path*",
    "/profile/:path*",
    "/faq/:path*",
    "/blogs/:path*",
  ],
};
