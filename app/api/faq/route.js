import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import FAQCandidate from "@/models/FAQCandidate";

export async function GET() {
  await connectToDatabase();

  try {
    const faqs = await FAQCandidate.find()
      .sort({ createdAt: -1 })
      .lean();

    // 🔑 IMPORTANT: convert ObjectIds → strings
    const safeFaqs = faqs.map((faq) => ({
      ...faq,
      _id: faq._id.toString(),
      exampleQueryIds: faq.exampleQueryIds?.map((id) => id.toString()) || [],
    }));

    return NextResponse.json(safeFaqs);
  } catch (err) {
    console.error("FETCH FAQ ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}
