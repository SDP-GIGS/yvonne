import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import LoginPage from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "KAHUMA WALID"
  });
  const [logs, setLogs] = useState([]);
  return (
    
    <BrowserRouter>
      <Navbar />

      {showDashboard ? (
        // <Dashboard 
        // goHome={() => setShowDashboard(false)}
        // currentUser={currentUser}
        // logs={logs}
        // setLogs={setLogs}
        //  />
        
        <LoginPage />

      ) : (
        <>
          <Hero goToDashboard={() => setShowDashboard(true)} />
          <Features />
        </>
      )}
        <Routes>
          {/* <Route path="/" element={<Hero goToDashboard={() => setShowDashboard(true)} />} />
          <Route path="/dashboard" element={<Dashboard 
        goHome={() => setShowDashboard(false)}
        currentUser={currentUser}
        logs={logs}
        setLogs={setLogs}
         />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      <Footer />
    </BrowserRouter>  
    
  );
}

export default App;