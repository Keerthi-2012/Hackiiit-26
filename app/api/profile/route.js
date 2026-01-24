import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    console.log("API called: GET /api/profile");
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    
    console.log("Query userId:", userId);
    console.log("Is valid ObjectId:", mongoose.Types.ObjectId.isValid(userId));
    
    // ADD THESE CRITICAL LOGS
    console.log("Database name:", mongoose.connection.db.databaseName);
    console.log("Collection name:", User.collection.name);
    console.log("Total users in collection:", await User.countDocuments());
    
    // Try to find ANY user first
    const anyUser = await User.findOne();
    console.log("Sample user from DB:", anyUser ? {
      _id: anyUser._id,
      _id_type: typeof anyUser._id,
      _id_string: anyUser._id.toString()
    } : "No users found");

    if (!userId) {
      return NextResponse.json({ message: "userId required" }, { status: 400 });
    }

    // Try all three methods
    const user1 = await User.findById(userId);
    console.log("findById result:", user1 ? "FOUND" : "NOT FOUND");
    
    const user2 = await User.findOne({ _id: userId });
    console.log("findOne (string) result:", user2 ? "FOUND" : "NOT FOUND");
    
    const user3 = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    console.log("findOne (ObjectId) result:", user3 ? "FOUND" : "NOT FOUND");

    const user = user1 || user2 || user3;
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User found:", user);
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      message: "Internal server error",
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { email, name, lab, researchArea } = body;

    // Validate required fields
    if (!email || !name || !lab || !researchArea) {
      return NextResponse.json(
        { message: "Missing required fields: email, name, lab, researchArea" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Create new user
    const newUser = await User.create({
      email,
      name,
      lab,
      researchArea
    });

    return NextResponse.json({ message: "User created", User: newUser }, { status: 201 });

  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}