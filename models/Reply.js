import mongoose from "mongoose";
import FileSchema from "../models/File"

const ReplySchema = new mongoose.Schema({
  query: { type: mongoose.Schema.Types.ObjectId, ref: "Query", required: true },
  parentReply: { type: mongoose.Schema.Types.ObjectId, ref: "Reply", default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  files: [FileSchema],
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, {collection:"Reply"});

export default mongoose.models.Reply || mongoose.model("Reply", ReplySchema);
