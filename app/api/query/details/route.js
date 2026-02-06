import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Query from "@/models/Query";
import Reply from "@/models/Reply";
import mongoose from "mongoose";
import "@/models/User";
export async function GET(request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get("queryId");

if (!queryId || !mongoose.Types.ObjectId.isValid(queryId)) {
  return NextResponse.json(
    { error: "Invalid or missing queryId" },
    { status: 400 }
  );
}

    // 1️⃣ Fetch query
    const query = await Query.findById(queryId)
      .populate("user", "name")
      .lean();

    if (!query) {
      return NextResponse.json(
        { error: "Query not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Fetch replies
    const replies = await Reply.find({ query: queryId })
      .populate("user", "name")
      .sort({ createdAt: 1 })
      .lean();

    // 3️⃣ Build nested replies
    const buildNestedReplies = (parentId) =>
      replies
        .filter(
          r =>
            (r.parentReply ? r.parentReply.toString() : null) === parentId
        )
        .map(r => ({
          _id: r._id,
          text: r.text,
          files: r.files,
          createdAt: r.createdAt,
          author: r.isAnonymous ? "Anonymous" : r.user?.name,
          replies: buildNestedReplies(r._id.toString()),
        }));

    const nestedReplies = buildNestedReplies(null);

    // 4️⃣ Final response
    return NextResponse.json(
      {
        _id: query._id,
        title: query.title,
        description: query.description,
        tags: query.tags,
        files: query.files,
        createdAt: query.createdAt,
        author: query.isAnonymous ? "Anonymous" : query.user?.name,
        replies: nestedReplies,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("QUERY DETAILS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch query details" },
      { status: 500 }
    );
  }
}