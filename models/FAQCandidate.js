import mongoose from "mongoose";

const FAQCandidateSchema = new mongoose.Schema({
  frequencyKey: { type: String, index: true },
  question: String,
  tags: [String],
  count: { type: Number, default: 1 },
  exampleQueryIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Query" }
  ],
  status: {
    type: String,
    enum: ["pending", "ready_for_review", "approved"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.FAQCandidate ||
  mongoose.model("FAQCandidate", FAQCandidateSchema);
