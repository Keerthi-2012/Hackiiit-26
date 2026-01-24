import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  researchArea: { type: String },
  lab: { type: String }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
