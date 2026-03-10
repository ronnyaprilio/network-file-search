import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  title: String,
  path: String,
  size: String,
  modified: Date,
  content: String,
});

export default mongoose.models.File ||
  mongoose.model("File", FileSchema);