import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all blogs and populate author name
    const blogs = await Blog.find()
      .populate("author", "name") // populate only 'name' field of user
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("FETCH BLOGS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
