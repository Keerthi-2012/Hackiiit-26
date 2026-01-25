import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import Query from "@/models/Query";
import Reply from "@/models/Reply";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  await connectToDatabase();

  try {
    /* 🔐 Auth */
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

    /* 1️⃣ Replies by this user */
    const userReplies = await Reply.find({ user: userId }).lean();

    if (userReplies.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    /* 2️⃣ Unique query IDs */
    const queryIds = [
      ...new Set(userReplies.map(r => r.query.toString()))
    ];

    /* 3️⃣ Fetch queries */
    const queries = await Query.find({ _id: { $in: queryIds } })
      .populate("user", "name") // ✅ correct field
      .sort({ createdAt: -1 })
      .lean();

    /* 4️⃣ All replies for replyCount */
    const allReplies = await Reply.find({ query: { $in: queryIds } }).lean();

    /* 5️⃣ Format response */
    const formattedQueries = queries.map(q => {
      const replyCount = allReplies.filter(
        r => r.query.toString() === q._id.toString()
      ).length;

      return {
        _id: q._id,              // ✅ use _id consistently
        title: q.title,
        description: q.description,
        tags: q.tags,
        createdAt: q.createdAt,
        replyCount,
        author: q.isAnonymous ? "Anonymous" : q.user?.name,
      };
    });

    return NextResponse.json(formattedQueries, { status: 200 });
  } catch (err) {
    console.error("MY ANSWERS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch answered queries" },
      { status: 500 }
    );
  }
}
