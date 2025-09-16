import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import Recorder from "./components/Recorder";
import Transcriptions from "./components/Transcriptions";
import axios from "axios";

export default function App() {
  const [transcription, setTranscription] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/history").then((res) => {
      setHistory(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 p-6 flex flex-col items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🎙️ Speech to Text App
        </h1>

        {/* Upload and Record Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex-1">
            <FileUpload setTranscription={setTranscription} />
          </div>
          <div className="flex-1">
            <Recorder setTranscription={setTranscription} />
          </div>
        </div>

        {/* Latest Transcription Card */}
        {transcription && (
          <div className="mt-6 p-5 bg-green-50 border border-green-300 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-green-800 mb-2">
              ✅ Latest Transcription:
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">{transcription}</p>
          </div>
        )}

        {/* Transcription History */}
        <div className="mt-8">
          <Transcriptions history={history} />
        </div>
      </div>
    </div>
  );
}
