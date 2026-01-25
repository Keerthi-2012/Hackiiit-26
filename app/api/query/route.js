import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Query from "@/models/Query";
import Reply from "@/models/Reply";
import jwt from "jsonwebtoken";
import User from "@/models/User";

import fs from "fs";
import path from "path";

/* =========================
   🔐 Extract userId from JWT (API-safe)
========================= */
function getUserIdFromRequest(request) {
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
   📝 POST: Create a new query
========================= */
export async function POST(request) {
  await connectToDatabase();

  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, tags, isAnonymous } = body;

    if (!title || !description || !tags?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = await Query.create({
      user: userId,
      title,
      description,
      tags,
      isAnonymous,
      files: [],
    });

    return NextResponse.json(
      { queryId: query._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("CREATE QUERY ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

/* =========================
   📄 GET: Fetch all queries (dashboard)
========================= */
export async function GET() {
  await connectToDatabase();

  try {
    const queries = await Query.find()
      .populate("user", "name")   // ✅ correct field
      .sort({ createdAt: -1 })
      .lean();

    const replies = await Reply.find().lean();

    const formatted = queries.map(q => {
      const replyCount = replies.filter(
        r => r.query.toString() === q._id.toString()
      ).length;

      return {
        _id: q._id,               // ✅ MongoDB ID
        title: q.title,
        description: q.description,
        tags: q.tags,
        files: q.files,
        createdAt: q.createdAt,
        replyCount,
        author: q.isAnonymous ? "Anonymous" : q.user?.name,
      };
    });

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("FETCH QUERY ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch queries" },
      { status: 500 }
    );
  }
}
