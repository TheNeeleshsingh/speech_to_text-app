import { useState } from "react";
import axios from "axios";

export default function FileUpload({ setTranscription }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("audio", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTranscription(res.data.text);
    } catch (error) {
      console.error(error);
      setTranscription("Error while uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-md hover:border-blue-400 transition-colors flex flex-col items-center">
      <p className="text-gray-600 mb-3">Attach an audio file to transcribe</p>

      {/* File Input */}
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />

      {/* Show selected file name */}
      {file && <p className="text-sm text-gray-500 mb-3">📂 {file.name}</p>}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white transition-colors shadow-md ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload & Transcribe"}
      </button>
    </div>
  );
}
