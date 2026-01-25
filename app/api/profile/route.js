import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Query from "@/models/Query";
import Reply from "@/models/Reply"
import Blog from "@/models/Blog"
// export async function GET() {
//   try {
//     await connectToDatabase();

//     // 🔐 identity comes from JWT
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//       return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//     }

//     const userId = decoded.userId;

//     const user = await User.findById(userId);

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ user });

//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
export async function GET() {
  try {
    await connectToDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Calculate stats (replace with real counts from DB)
    const queriesCount = await Query.countDocuments({ user: userId });
    const answersCount = await Reply.countDocuments({ user: userId });
    const blogsCount = await Blog.countDocuments({ author: userId });
    console.log(userId);
    return NextResponse.json({
      user,
      stats: {
        queries: queriesCount,
        answers: answersCount,
        blogs: blogsCount,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const body = await req.json();
    const { lab, researchArea } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { lab, researchArea },
      { new: true }
    );

    return NextResponse.json({ user: updatedUser });

  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
