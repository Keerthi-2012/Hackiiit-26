// import { NextResponse } from "next/server";
// import connectToDatabase from "@/lib/mongodb";
// import Query from "@/models/Query";
// import Reply from "@/models/Reply";
// import jwt from "jsonwebtoken";
// import fs from "fs";
// import path from "path";

// /* =========================
//    🔐 Extract userId from JWT (API-safe)
// ========================= */
// function getUserIdFromRequest(request) {
//   const token = request.cookies.get("token")?.value;
//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded.userId;
//   } catch {
//     return null;
//   }
// }

// /* =========================
//    📝 POST: Create a new query
// ========================= */
// export async function POST(request) {
//   await connectToDatabase();

//   try {
//     // ✅ userId from JWT cookie
//     const userId = getUserIdFromRequest(request);
//     if (!userId) {
//       return NextResponse.json(
//         { error: "Unauthorized: user missing" },
//         { status: 401 }
//       );
//     }

//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const tags = formData.get("tags");
//     const isAnonymous = formData.get("isAnonymous") === "true";

//     if (!title || !description) {
//       return NextResponse.json(
//         { error: "Title and description required" },
//         { status: 400 }
//       );
//     }

//     /* 📎 Handle file uploads safely */
//     const uploadedFiles = [];
//     for (const [key, value] of formData.entries()) {
//       if (
//         key === "files" &&
//         value &&
//         value.name &&
//         value.size > 0
//       ) {
//         const buffer = Buffer.from(await value.arrayBuffer());
//         const uploadDir = path.join(process.cwd(), "public/uploads");
//         fs.mkdirSync(uploadDir, { recursive: true });

//         const filename = `${Date.now()}-${value.name}`;
//         fs.writeFileSync(path.join(uploadDir, filename), buffer);

//         uploadedFiles.push({
//           filename: value.name,
//           url: `/uploads/${filename}`,
//           fileType: path.extname(value.name).substring(1),
//           uploadedAt: new Date(),
//         });
//       }
//     }

//     /* 🗃️ Create query */
//     const query = await Query.create({
//       user: userId,              // ✅ CONSISTENT WITH USER._id
//       title,
//       description,
//       tags: tags ? tags.split(",").map(t => t.trim()) : [],
//       files: uploadedFiles,
//       isAnonymous,
//     });

//     return NextResponse.json(
//       { queryId: query._id },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("CREATE QUERY ERROR:", err);
//     return NextResponse.json(
//       { error: err.message },
//       { status: 500 }
//     );
//   }
// }

// /* =========================
//    📄 GET: Fetch all queries (dashboard)
// ========================= */
// export async function GET() {
//   await connectToDatabase();

//   try {
//     const queries = await Query.find()
//       .populate("user", "name")   // ✅ correct field
//       .sort({ createdAt: -1 })
//       .lean();

//     const replies = await Reply.find().lean();

//     const formatted = queries.map(q => {
//       const replyCount = replies.filter(
//         r => r.query.toString() === q._id.toString()
//       ).length;

//       return {
//         _id: q._id,               // ✅ MongoDB ID
//         title: q.title,
//         description: q.description,
//         tags: q.tags,
//         files: q.files,
//         createdAt: q.createdAt,
//         replyCount,
//         author: q.isAnonymous ? "Anonymous" : q.user?.name,
//       };
//     });

//     return NextResponse.json(formatted, { status: 200 });
//   } catch (err) {
//     console.error("FETCH QUERY ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch queries" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Query from "@/models/Query";
import FaqCandidate from "@/models/FaqCandidate"; // ✅ new
import Reply from "@/models/Reply";
import jwt from "jsonwebtoken";
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
   📝 Normalize title for frequency tracking
========================= */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .filter((w) => w.length > 3)
    .slice(0, 4)
    .join(" ");
}

/* =========================
   📝 POST: Create a new query + FAQ candidate
========================= */
export async function POST(request) {
  await connectToDatabase();

  try {
    // ✅ userId from JWT cookie
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: user missing" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const tags = formData.get("tags");
    const isAnonymous = formData.get("isAnonymous") === "true";

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description required" },
        { status: 400 }
      );
    }

    /* 📎 Handle file uploads safely */
    const uploadedFiles = [];
    for (const [key, value] of formData.entries()) {
      if (key === "files" && value && value.name && value.size > 0) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public/uploads");
        fs.mkdirSync(uploadDir, { recursive: true });

        const filename = `${Date.now()}-${value.name}`;
        fs.writeFileSync(path.join(uploadDir, filename), buffer);

        uploadedFiles.push({
          filename: value.name,
          url: `/uploads/${filename}`,
          fileType: path.extname(value.name).substring(1),
          uploadedAt: new Date(),
        });
      }
    }

    /* 🗃️ Create query */
    const query = await Query.create({
      user: userId,
      title,
      description,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      files: uploadedFiles,
      isAnonymous,
    });

    /* 🔥 Frequency-based FAQ tracking */
    const normalizedTitle = normalize(title);
    const frequencyKey = `${tags?.split(",")[0]?.trim() || "general"}:${normalizedTitle}`;
    const THRESHOLD = 5;

    let candidate = await FaqCandidate.findOne({ frequencyKey });

    if (candidate) {
      candidate.count += 1;
      candidate.exampleQueryIds.push(query._id);

      if (candidate.count >= THRESHOLD) candidate.status = "ready_for_review";

      await candidate.save();
    } else {
      await FaqCandidate.create({
        frequencyKey,
        question: title,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        exampleQueryIds: [query._id],
      });
    }

    return NextResponse.json({ queryId: query._id }, { status: 201 });
  } catch (err) {
    console.error("CREATE QUERY ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* =========================
   📄 GET: Fetch all queries (dashboard)
========================= */
export async function GET() {
  await connectToDatabase();

  try {
    const queries = await Query.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .lean();

    const replies = await Reply.find().lean();

    const formatted = queries.map((q) => {
      const replyCount = replies.filter(
        (r) => r.query.toString() === q._id.toString()
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
    return NextResponse.json({ error: "Failed to fetch queries" }, { status: 500 });
  }
}
