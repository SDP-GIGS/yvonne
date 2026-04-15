import LogForm from "./LogForm";
import LogList from "./LogList";
import { useState } from "react";

function Dashboard({ goHome }) {
  const [logs, setLogs] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={goHome}>Back to Home</button>

      <h1>Intern Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* LEFT: FORM */}
        <div style={{ flex: 1 }}>
          <LogForm logs={logs} setLogs={setLogs} />
        </div>

        {/* RIGHT: LIST */}
        <div style={{ flex: 1 }}>
          <LogList logs={logs} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;