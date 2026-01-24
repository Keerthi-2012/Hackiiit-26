import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  fileType: { type: String }, // e.g., "image", "pdf", "docx"
  uploadedAt: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  files: [FileSchema],       // Optional file attachments
  createdAt: { type: Date, default: Date.now }
}, { collection: "Blog" });

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
