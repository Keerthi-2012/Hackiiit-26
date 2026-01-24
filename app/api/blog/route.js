import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

/* =========================
   🔐 Get userId from cookie
========================= */
function getUserId(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
}

/* =========================
   📄 GET: My blogs
========================= */
export async function GET(request) {
  await connectToDatabase();

  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const blogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 })
      .lean();

    const formatted = blogs.map((b) => ({
      id: b._id,
      title: b.title,
      summary: b.summary || b.content.slice(0, 120) + "...",
      createdAt: b.createdAt.toDateString(),
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("BLOG GET ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

/* =========================
   📝 POST: Add blog
========================= */
export async function POST(request) {
  await connectToDatabase();

  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, content } = await request.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content required" },
        { status: 400 }
      );
    }

    await Blog.create({
      author: userId,
      title,
      content,
      summary: content.slice(0, 120),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("BLOG POST ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
