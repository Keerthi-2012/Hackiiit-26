import { NextResponse } from "next/server";
import Reply from "@/models/Reply";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

/* 🔐 Extract userId from JWT */
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

/* =======================
   POST → Create reply
======================= */
export async function POST(request) {
  await connectToDatabase();

  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const queryId = formData.get("queryId");
    const parentReplyId = formData.get("parentReplyId");
    const text = formData.get("text");

    if (!queryId || !text) {
      return NextResponse.json(
        { error: "queryId and text are required" },
        { status: 400 }
      );
    }

    /* 📎 File upload */
    const files = [];
    const file = formData.get("file");

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads");
      fs.mkdirSync(uploadDir, { recursive: true });

      const filename = `${Date.now()}-${file.name}`;
      fs.writeFileSync(path.join(uploadDir, filename), buffer);

      files.push({
        filename: file.name,
        url: `/uploads/${filename}`,
      });
    }

    const reply = await Reply.create({
      query: queryId,
      parentReply: parentReplyId || null,
      user: userId,
      text,
      files,
    });

    return NextResponse.json({ reply }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reply error:", err);
    return NextResponse.json(
      { error: "Failed to post reply" },
      { status: 500 }
    );
  }
}

/* =======================
   GET → Fetch replies
======================= */
export async function GET(request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get("queryId");

    if (!queryId) {
      return NextResponse.json(
        { error: "queryId is required" },
        { status: 400 }
      );
    }

    const replies = await Reply.find({ query: queryId })
      .populate("user", "name")
      .sort({ createdAt: 1 })
      .lean();

    const buildTree = (parentId = null) =>
      replies
        .filter(
          (r) =>
            (r.parentReply ? r.parentReply.toString() : null) === parentId
        )
        .map((r) => ({
          _id: r._id,
          text: r.text,
          userName: r.user?.name || "User",
          createdAt: r.createdAt,
          files: r.files || [],
          replies: buildTree(r._id.toString()),
        }));

    return NextResponse.json(buildTree(), { status: 200 });
  } catch (err) {
    console.error("GET /api/reply error:", err);
    return NextResponse.json(
      { error: "Failed to fetch replies" },
      { status: 500 }
    );
  }
}
