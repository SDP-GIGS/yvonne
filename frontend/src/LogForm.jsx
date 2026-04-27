import { useState } from "react";

function LogForm({ logs, setLogs, currentUser}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png"
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Only PDF, JPG, and PNG files are allowed.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5MB.");
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleAddLog = () => {
    if (!text.trim() && !file) {
      setError("Please enter a log or upload a file.");
      return;
    }

    const newLog = {
      text,
      file,
      date: new Date().toLocaleString(),
      userId: currentUser.id
    };

    setLogs([...logs, newLog]);

    setText("");
    setFile(null);
    setError("");
  };

  return (
    <div>
      <h2>Add Log</h2>

      <input
        type="text"
        value={text}
        placeholder="Write your log..."
        onChange={(e) => setText(e.target.value)}
      />

      <input type="file" onChange={handleFileChange} />

      <button
        onClick={handleAddLog}
        disabled={!text.trim() && !file}
      >
        Submit
      </button>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default LogForm;
//to delete afterwards 