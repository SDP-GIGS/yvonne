import { useState } from "react";

function LogForm() {
    const [log, setLog] = useState("");

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h2>Add Internship Log </h2>
            <input 
            type="text"
            placeholder="Enter your log here..."
            value={log}
            onChange={(e) => setLog(e.target.value)}
            style={{
                padding: "10px",
                width: "300px",
                marginRight: "10px",
            }}
            />
            <button
            onClick={() => console.log(log)}
            style={{ padding: "10px 20px "}}>
            Add Log</button>
        </div>
    );
}
export default LogForm;