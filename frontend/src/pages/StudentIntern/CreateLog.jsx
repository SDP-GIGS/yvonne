import { useState } from "react";

export default function CreateLog() {
    const [logData, setLogData] = useState([]);
    const [activity, setActivity] = useState("");

    const addLog = () => {
        if (activity === "") return;

        const newLog = {
            id: Date.now(),
            activity: activity,
            status: "Pending",
        };

        setLogs([...logData, newLog]);
        setActivity("");
    };

    const deleteLog = (id) => {
        setLogs(logData.filter((log) => log.id !== id));
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create Internship Log</h1>
            <div className="flex gap-3 mb-4">

                <input
                    type="text"
                    placeholder="Describe your activity..."
                    className="
                    border p-2 rounded w-full"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                />
                <button
                    onClick={addLog}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >

                    Add Log
                </button>
            </div>
            <ul className="space-y-2">
                {logData.map((log) => (
                    <li
                        key={log.id}
                        className="flex justify-between bg-gray-100 p-3 rounded"
                    >
                        {log.activity}

                        <button
                            onClick={() => deleteLog(log.id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}



