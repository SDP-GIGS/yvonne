import { useState } from "react";

function LogForm({ logs, setLogs }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleAddLog = () => {
    if (!text.trim() && !file) return;

    const newLog = {
      text,
      file,
      date: new Date().toLocaleString()
    };

    setLogs([...logs, newLog]);

    setText("");
    setFile(null);
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

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleAddLog}>
        Submit
      </button>
    </div>
  );
}

export default LogForm;