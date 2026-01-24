import { NextResponse } from "next/server";
import Query from "@/models/Query";
import connectToDatabase from "@/lib/mongodb";
import fs from "fs";
import path from "path";
import User from "@/models/User"; // <-- important!

export async function POST(request) {
  await connectToDatabase();

  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const tags = formData.get("tags");
    const userId = formData.get("userId");
    const isAnonymous = formData.get("isAnonymous") === "true";

    // Handle files
    const uploadedFiles = [];
    for (const [key, value] of formData.entries()) {
      if (key === "files" && value instanceof File) {
        const fileBuffer = Buffer.from(await value.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "/public/uploads");
        fs.mkdirSync(uploadDir, { recursive: true });

        const filename = Date.now() + "-" + value.name;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, fileBuffer);

        uploadedFiles.push({
          filename: value.name,
          url: "/uploads/" + filename,
          fileType: path.extname(value.name).substring(1),
          uploadedAt: new Date(),
        });
      }
    }

    // Create query in MongoDB
    const newQuery = await Query.create({
      user: userId,
      title,
      description,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
      files: uploadedFiles,
      isAnonymous,
    });

    return NextResponse.json(newQuery, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create query" }, { status: 500 });
  }
}

// GET endpoint to fetch all queries for dashboard
import Reply from "@/models/Reply";

export async function GET() {
  await connectToDatabase();

  try {
    // 1️⃣ Fetch all queries
    const queries = await Query.find()
      .populate("user", "userName")
      .sort({ createdAt: -1 })
      .lean();

    // 2️⃣ Fetch all replies
    const allReplies = await Reply.find().lean();

    // 3️⃣ Count replies per query
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
        replyCount, // number of replies
      };
    });

    return NextResponse.json(formattedQueries, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch queries" }, { status: 500 });
  }
}
