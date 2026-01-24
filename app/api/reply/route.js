import { NextResponse } from "next/server";
import Reply from "@/models/Reply";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const { queryId, parentReplyId, userId, text, isAnonymous } = body;

    const newReply = await Reply.create({
      query: queryId,
      parentReply: parentReplyId || null,
      user: userId,
      text,
      isAnonymous: isAnonymous || false,
      files: [],
    });

    return NextResponse.json({ message: "Reply added", reply: newReply }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add reply" }, { status: 500 });
  }
}

export async function GET(request) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get("queryId");

    if (!queryId) return NextResponse.json({ error: "queryId is required" }, { status: 400 });

    const allReplies = await Reply.find({ query: queryId })
      .populate("user", "userName")
      .sort({ createdAt: 1 })
      .lean();

    // Recursive function to build nested replies
    const buildNested = (parentId) => {
      return allReplies
        .filter(r => (r.parentReply ? r.parentReply.toString() : null) === parentId)
        .map(r => ({
          ...r,
          userName: r.isAnonymous ? "Anonymous" : r.user.userName,
          replies: buildNested(r._id.toString())
        }));
    };

    const nestedReplies = buildNested(null);

    return NextResponse.json(nestedReplies, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }
}
