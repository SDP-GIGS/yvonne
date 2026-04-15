import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "KAHUMA WALID"
  });
  const [logs, setLogs] = useState([]);
  return (
    <>
      <Navbar />

      {showDashboard ? (
        <Dashboard 
        goHome={() => setShowDashboard(false)}
        currentUser={currentUser}
        logs={logs}
        setLogs={setLogs}
         />

      ) : (
        <>
          <Hero goToDashboard={() => setShowDashboard(true)} />
          <Features />
        </>
      )}

      <Footer />
    </>
  );
}

export default App;