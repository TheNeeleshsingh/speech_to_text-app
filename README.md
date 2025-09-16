# Speech to Text App

A full-stack web application that allows users to upload audio files or record audio in real-time and convert speech to text using Deepgram's AI-powered transcription service. The app stores transcription history in a MongoDB database and provides a clean, responsive user interface built with React and Tailwind CSS.

## Features

- **File Upload**: Upload audio files (e.g., MP3, WAV) for transcription
- **Real-time Recording**: Record audio directly from the browser and transcribe it
- **AI-Powered Transcription**: Uses Deepgram's Nova-2 model for accurate speech-to-text conversion
- **Transcription History**: View and manage past transcriptions stored in MongoDB
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **RESTful API**: Backend API for handling uploads, transcriptions, and history retrieval

## Tech Stack

### Backend
- **Node.js** with **Express.js** for the server
- **Deepgram SDK** for speech-to-text transcription
- **MongoDB** with **Mongoose** for data storage
- **Multer** for file upload handling
- **CORS** for cross-origin requests

### Frontend
- **React** with **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **ESLint** for code linting

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Deepgram API Key** (sign up at [deepgram.com](https://deepgram.com))

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd speech_to_text
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

1. **Environment Variables**:
   Create `.env` files in both `backend/` and `frontend/` directories.

   **Backend (.env)**:
   ```
   DEEPGRAM_API_KEY=your_deepgram_api_key_here
   MONGO_URI=mongodb://localhost:27017/speech_to_text
   PORT=5000
   ```

   **Frontend (.env)**:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

2. **MongoDB Setup**:
   - If using local MongoDB, ensure it's running on the default port.
   - For MongoDB Atlas, update the `MONGO_URI` with your connection string.

## Running the Application

1. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

2. **Start the frontend development server**:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

3. **Open your browser** and navigate to `http://localhost:5173` to use the application.

## Usage

1. **Upload Audio File**:
   - Click on the "Upload Audio File" section
   - Select an audio file from your device
   - The transcription will appear below once processed

2. **Record Audio**:
   - Click on the "Record Audio" section
   - Grant microphone permissions if prompted
   - Click "Start Recording" and speak
   - Click "Stop Recording" to process the audio
   - The transcription will be displayed

3. **View History**:
   - Scroll down to see all previous transcriptions
   - Each entry shows the file name (if uploaded) and the transcribed text

## API Endpoints

### POST /api/upload
Upload an audio file for transcription.

**Request**: Multipart form data with `audio` field containing the audio file.

**Response**:
```json
{
  "text": "Transcribed text here..."
}
```

### GET /api/history
Retrieve transcription history.

**Response**:
```json
[
  {
    "_id": "object_id",
    "fileName": "audio_file.mp3",
    "transcription": "Transcribed text...",
    "createdAt": "2023-10-01T12:00:00.000Z"
  }
]
```

## Project Structure

```
speech_to_text/
├── backend/
│   ├── models/
│   │   └── transcription.js
│   ├── routes/
│   │   └── upload.js
│   ├── uploads/          # Temporary file storage
│   ├── package.json
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Recorder.jsx
│   │   │   └── Transcriptions.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json files for details.

## Acknowledgments

- [Deepgram](https://deepgram.com) for providing the speech-to-text API
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
