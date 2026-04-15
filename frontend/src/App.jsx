import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      <Navbar />

      {showDashboard ? (
        <Dashboard goHome={() => setShowDashboard(false)} />
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