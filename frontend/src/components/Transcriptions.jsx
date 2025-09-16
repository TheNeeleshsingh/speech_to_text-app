export default function Transcriptions({ history }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">📜 Transcription History</h2>
      {history.map((item) => (
        <div key={item._id} className="p-3 border-b">
          <p className="font-bold">{item.fileName}</p>
          <p>{item.transcription}</p>
          <small className="text-gray-500">{new Date(item.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
