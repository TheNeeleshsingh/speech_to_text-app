import express from "express";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@deepgram/sdk";
import Transcription from "../models/transcription.js";

dotenv.config();
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Deepgram v3 initialization
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

// Upload & Transcribe
router.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    console.log("📥 [UPLOAD] Request received");
    console.log("File details:", req.file);

    if (!req.file) {
      console.error("❌ No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    console.log("🎙 Sending file to Deepgram...");

    // Read audio file into buffer
    const audioBuffer = fs.readFileSync(filePath);

    // ✅ Deepgram v3 call
    const { result } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      { mimetype: req.file.mimetype, model: "nova-2", smart_format: true }
    );

    const transcript =
      result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    console.log("✅ Transcription received:", transcript);

    // Save in MongoDB
    const newEntry = new Transcription({
      fileName: req.file.originalname,
      transcription: transcript,
    });

    await newEntry.save();
    console.log("💾 Saved transcription to MongoDB");

    fs.unlinkSync(filePath); // cleanup
    console.log("🧹 Deleted temporary file:", filePath);

    res.json({ text: transcript });
  } catch (err) {
    console.error("❌ Error in /upload route:", err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

// Fetch History
router.get("/history", async (req, res) => {
  console.log("📜 Fetching transcription history...");
  const history = await Transcription.find().sort({ createdAt: -1 });
  res.json(history);
});

export default router;
