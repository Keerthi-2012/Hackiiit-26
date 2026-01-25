import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String },
  createdAt: { type: Date, default: Date.now },
}, {collection:"Blog"});

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);
