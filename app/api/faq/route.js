import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Faq from "@/models/FAQCandidate.js";

export async function GET() {
  await connectToDatabase();

  try {
    const faqs = await Faq.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(faqs, { status: 200 });
  } catch (err) {
    console.error("FETCH FAQ ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}
