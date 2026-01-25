import { FormatQuoteOutlined } from "@mui/icons-material";
import mongoose from "mongoose";
const FaqCandidateSchema = new mongoose.Schema({
  frequencyKey: { type: String, required: true, index: true },
  question: { type: String, required: true },
  tags: { type: [String], required: true },
  count: { type: Number, default: 1 },
  exampleQueryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Query" }],
  status: { 
    type: String, 
    enum: ["pending", "ready_for_review", "approved"], 
    default: "pending",
    index: true
  },
  createdAt: { type: Date, default: Date.now },
});

const faq = mongoose.models.FaqCandidate || mongoose.model("FaqCandidate", FaqCandidateSchema);
export default faq;