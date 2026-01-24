import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  fileType: { type: String },  // e.g., "image", "pdf", "docx"
  uploadedAt: { type: Date, default: Date.now }
});

const ReplySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  files: [FileSchema],       // <-- files attached to reply
  createdAt: { type: Date, default: Date.now }
}, { collection: "Reply" });

const QuerySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  tags: [{ type: String }],  // list of strings
  files: [FileSchema],       // <-- files attached to query
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now }
},{ collection: "Query" });

export default mongoose.models.Query || mongoose.model("Query", QuerySchema);
