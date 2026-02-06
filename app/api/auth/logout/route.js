import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Clear the JWT token cookie
    const res = NextResponse.json(
      { success: true, message: "Logged out successfully" }
    );

    res.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Clear the JWT token cookie
    const res = NextResponse.json(
      { success: true, message: "Logged out successfully" }
    );

    res.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
