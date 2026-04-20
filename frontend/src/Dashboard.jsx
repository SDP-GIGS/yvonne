import LogForm from "./LogForm";
import LogList from "./LogList";
import { useState } from "react";


function Dashboard({ goHome, currentUser, logs, setLogs }) {
  
  const userLogs = logs.filter(
    (log) => log.userId === currentUser.id
  );

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={goHome}>Back to Home</button>

      <h1>{currentUser.name}'s Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <LogForm
          logs={logs}
          setLogs={setLogs}
          currentUser={currentUser}
        />

        <LogList logs={userLogs} />
      </div>
    </div>
  );
}

export default Dashboard;