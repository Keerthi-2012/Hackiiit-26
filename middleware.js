import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Public routes
  const publicPaths = [
    "/",
    "/api/auth/login",
    "/api/auth/logout",
  ];

  if (publicPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 🔐 Protect everything else
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Pages
    "/dashboard/:path*",
    "/query/:path*",
    "/profile/:path*",
    "/faq/:path*",
    "/blogs/:path*",

    // 🔥 APIs (THIS WAS MISSING)
    "/api/blog/:path*",
    "/api/query/:path*",
    "/api/profile/:path*",
    "/api/reply/:path*",
  ],
};
