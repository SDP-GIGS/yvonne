import { useState } from "react";

function LogForm() {
  const [log, setLog] = useState("");
  const [logs, setLogs] = useState([]);

  const handleAddLog = () => {
    if (log.trim() === "") return;

    setLogs([...logs, log]); // add new log to array
    setLog(""); // clear input
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Add Internship Log</h2>

      <input
        type="text"
        placeholder="Enter your log..."
        value={log}
        onChange={(e) => setLog(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px"
        }}
      />

      <button
        onClick={handleAddLog}
        style={{ padding: "10px 20px" }}
      >
        Add Log
      </button>

      {/* DISPLAY LOGS */}
      <div style={{ marginTop: "30px" }}>
        <h3>Your Logs:</h3>

        {logs.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default LogForm;