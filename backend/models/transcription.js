import mongoose from "mongoose";

const transcriptionSchema = new mongoose.Schema({
  fileName: String,
  transcription: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transcription", transcriptionSchema);
