import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Query from "@/models/Query";
import FAQCandidate from "@/models/FAQCandidate";
import jwt from "jsonwebtoken";
import User from "@/models/User"
import Reply from "@/models/Reply"
import path from "path";  // <-- ADD THIS
import fs from "fs";      // <-- ADD THIS

/* =========================
   🔐 Extract userId from JWT
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
   🧠 Normalize text
========================= */
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/* =========================
   📝 POST: Create Query + Track FAQ
========================= */
export async function POST(request) {
  await connectToDatabase();

  try {
    // 🔐 Auth
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📥 Body
    const body = await request.json();
    const { title, description, tags, isAnonymous = false } = body;

    if (!title || !description || !tags) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🏷️ Normalize tags (array OR string)
    const tagArray = Array.isArray(tags)
      ? tags.map(t => t.trim())
      : tags.split(",").map(t => t.trim());

    /* =========================
       ✅ CREATE QUERY (UNCHANGED)
    ========================= */
    const query = await Query.create({
      user: userId,
      title,
      description,
      tags: tagArray,
      isAnonymous,
      files: [],
    });

    /* =========================
       🔥 FAQ CANDIDATE TRACKING
    ========================= */
    const normalizedTitle = normalize(title);
    const primaryTag = tagArray[0] || "general";
    const frequencyKey = `${primaryTag}:${normalizedTitle}`;
    const THRESHOLD = 5;

    let candidate = await FAQCandidate.findOne({ frequencyKey });

    if (candidate) {
      candidate.count += 1;
      candidate.exampleQueryIds.push(query._id);

      if (candidate.count >= THRESHOLD) {
        candidate.status = "ready_for_review"; // ✅ valid enum
      }

      await candidate.save();
    } else {
      await FAQCandidate.create({
        frequencyKey,
        question: title,
        tags: tagArray,
        exampleQueryIds: [query._id],
        count: 1
        // status defaults to "pending"
      });
    }

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
   📄 GET: Fetch all queries
========================= */
export async function GET() {
  await connectToDatabase();

  try {
    const queries = await Query.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .lean();

    const replies = await Reply.find().lean();

    const formatted = queries.map(q => {
      const replyCount = replies.filter(
        r => r.query.toString() === q._id.toString()
      ).length;

      return {
        _id: q._id,
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