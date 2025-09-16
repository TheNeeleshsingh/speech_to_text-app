import { useState, useRef } from "react";
import axios from "axios";

export default function Recorder({ setTranscription }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const file = new File([blob], "recording.webm", { type: "audio/webm" });

      const formData = new FormData();
      formData.append("audio", file);

      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTranscription(res.data.text);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4 border rounded bg-white mt-4">
      {!recording ? (
        <button onClick={startRecording} className="bg-red-500 text-white px-4 py-2 rounded">
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording} className="bg-green-500 text-white px-4 py-2 rounded">
          Stop Recording
        </button>
      )}
    </div>
  );
}
