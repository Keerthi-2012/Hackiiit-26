import Query from "@/models/Query";
import Reply from "@/models/Reply";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) { // returns all the questions asked by user
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // 1️⃣ Fetch all queries by this user
    const queries = await Query.find({ user: userId })
      .populate("user", "userName")
      .sort({ createdAt: -1 })
      .lean();

    // 2️⃣ Fetch all replies for these queries
    const queryIds = queries.map(q => q._id.toString());
    const allReplies = await Reply.find({ query: { $in: queryIds } }).lean();

    // 3️⃣ Attach reply count to each query
    const formattedQueries = queries.map(q => {
      const replyCount = allReplies.filter(r => r.query.toString() === q._id.toString()).length;

      return {
        id: q._id,
        title: q.title,
        description: q.description,
        tags: q.tags,
        files: q.files,
        createdAt: q.createdAt,
        userName: q.isAnonymous ? "Anonymous" : q.user.userName,
        replyCount,
      };
    });

    return NextResponse.json(formattedQueries, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch user queries" }, { status: 500 });
  }
}
export async function POST(request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // 1️⃣ Find all replies by this user
    const userReplies = await Reply.find({ user: userId }).lean();

    if (userReplies.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // 2️⃣ Get unique queryIds from these replies
    const queryIds = [...new Set(userReplies.map(r => r.query.toString()))];

    // 3️⃣ Fetch the queries themselves
    const queries = await Query.find({ _id: { $in: queryIds } })
      .populate("user", "userName")
      .sort({ createdAt: -1 })
      .lean();

    // 4️⃣ Fetch all replies for these queries to calculate reply counts
    const allReplies = await Reply.find({ query: { $in: queryIds } }).lean();

    // 5️⃣ Map queries with reply count
    const formattedQueries = queries.map(q => {
      const replyCount = allReplies.filter(r => r.query.toString() === q._id.toString()).length;

      return {
        id: q._id,
        title: q.title,
        description: q.description,
        tags: q.tags,
        files: q.files,
        createdAt: q.createdAt,
        userName: q.isAnonymous ? "Anonymous" : q.user.userName,
        replyCount, // total replies for this query
      };
    });

    return NextResponse.json(formattedQueries, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch replied queries" }, { status: 500 });
  }
}
