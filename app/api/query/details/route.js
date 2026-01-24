import Query from "@/models/Query";
import Reply from "@/models/Reply";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User"
export async function GET(request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get("queryId");

    if (!queryId) {
      return NextResponse.json({ error: "queryId is required" }, { status: 400 });
    }

    // 1️⃣ Fetch the query
    const query = await Query.findById(queryId)
      .populate("user", "userName")
      .lean();

    if (!query) {
      return NextResponse.json({ error: "Query not found" }, { status: 404 });
    }

    // 2️⃣ Fetch all replies for this query
    const replies = await Reply.find({ query: queryId })
      .populate("user", "userName")
      .sort({ createdAt: 1 })
      .lean();

    // 3️⃣ Build nested replies recursively
    const buildNestedReplies = (parentId) => {
      return replies
        .filter(r => (r.parentReply ? r.parentReply.toString() : null) === parentId)
        .map(r => ({
          _id: r._id,
          text: r.text,
          files: r.files,
          createdAt: r.createdAt,
          userName: r.isAnonymous ? "Anonymous" : r.user.userName,
          replies: buildNestedReplies(r._id.toString()) // recursive
        }));
    };

    const nestedReplies = buildNestedReplies(null);

    // 4️⃣ Return query with replies
    const formattedQuery = {
      id: query._id,
      title: query.title,
      description: query.description,
      tags: query.tags,
      files: query.files,
      createdAt: query.createdAt,
      userName: query.isAnonymous ? "Anonymous" : query.user.userName,
      replies: nestedReplies
    };

    return NextResponse.json(formattedQuery, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch query details" }, { status: 500 });
  }
}
