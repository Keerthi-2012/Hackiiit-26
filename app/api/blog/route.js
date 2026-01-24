import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    await connectToDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;

    console.log(userId)
    if (!userId) {
      return NextResponse.json({ message: "userId required" }, { status: 400 });
    }
    const Blogs = await Blog.find({ user: userId })
      .sort({ createdAt: -1 }); // newest first

    return NextResponse.json({ Blogs });
  } catch (err) {
    console.error("GET /api/blog error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { user, title, content, files } = body;

    if (!user || !title || !content) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newBlog = await Blog.create({
      user,
      title,
      content,
      files: files || [],
    });

    return NextResponse.json({ message: "Blog created", Blog: newBlog }, { status: 201 });
  } catch (err) {
    console.error("POST /api/blog error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
