import { useEffect, useState } from "react";
import API from "./api";

export default function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    API.get("/api/hello/")
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage(`Error: ${err.message}`));
  }, []);

  return (
    <div className="App">
      <h1>{ message }</h1>
    </div>
  );
}
