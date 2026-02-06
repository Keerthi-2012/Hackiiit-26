import FileSchema from "../models/File"
import mongoose from "mongoose";
import "@/models/User";  

const QuerySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  tags: [{ type: String }],
  files: [FileSchema],
  isAnonymous: { type: Boolean, default: false }, // <-- new field
  createdAt: { type: Date, default: Date.now }
},{ collection: "Query" });

export default mongoose.models.Query || mongoose.model("Query", QuerySchema);