import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  data: { type: String, required: true },
  fileType: { type: String },
  uploadedAt: { type: Date, default: Date.now },
}, { collection: "File" });
export default FileSchema;

