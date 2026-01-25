import Query from "@/models/Query";
import Reply from "@/models/Reply";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) { // returns all the questions asked by user
  await connectToDatabase();

  try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
  
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
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
import mongoose from "mongoose"; // ✅ default import


export async function DELETE(req) {
  try {
    await connectToDatabase();

    // ✅ get token correctly in App Router route
    // const cookieStore = cookies();
    // const token = cookieStore.get("token")?.value;

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // // Verify token
    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch {
    //   return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    // }

    // const userId = decoded.userId;
    // if (!userId) {
    //   return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    // }
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
  
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const body = await req.json();
    const queryId = body?.id;

    if (!queryId) {
      return NextResponse.json({ message: "Query ID missing" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(queryId)) {
      return NextResponse.json({ message: "Invalid query ID" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const query = await Query.findOne({
      _id: new mongoose.Types.ObjectId(queryId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!query) {
      return NextResponse.json({ message: "Query not found" }, { status: 404 });
    }

    await query.deleteOne();
    return NextResponse.json({ message: "Query deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
