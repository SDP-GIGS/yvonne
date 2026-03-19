// src/App.jsx
import { useState } from "react";

function App() {
  const [hover, setHover] = useState(false);

  return (
<<<<<<< HEAD
    <div className="App">
      <h1>{ message }</h1>
    </div>
=======
    <>
      {/* HEADER */}
      <header
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          background: "#111827", // dark navy-gray
          color: "white",
          textAlign: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>ILES System</h1>
        <nav>
          <a href="#home" style={{ margin: "0 15px", color: "#60a5fa", textDecoration: "none" }}>Home</a>
          <a href="#features" style={{ margin: "0 15px", color: "#60a5fa", textDecoration: "none" }}>Features</a>
          <a href="#contact" style={{ margin: "0 15px", color: "#60a5fa", textDecoration: "none" }}>Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          padding: "120px 20px",
          background: "#1f2937", 
          color: "#f9fafb"
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Internship Logging and Evaluation System</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Track, Evaluate, and Improve Intern Performance Seamlessly
        </p>
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            padding: "12px 28px",
            fontSize: "16px",
            cursor: "pointer",
            background: hover ? "#2563eb" : "#3b82f6", 
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: hover ? "0 4px 12px rgba(59,130,246,0.5)" : "0 2px 6px rgba(59,130,246,0.3)",
            transition: "all 0.3s ease"
          }}
        >
          Get Started
        </button>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          padding: "60px 20px",
          background: "#111827", 
          color: "#f9fafb",
        }}
      >
        {[
          { title: "Logging", text: "Keep track of all intern activities efficiently." },
          { title: "Evaluation", text: "Rate performance with detailed evaluation metrics." },
          { title: "Reports", text: "Generate insightful reports for supervisors and interns." }
        ].map((feature) => (
          <div
            key={feature.title}
            style={{
              background: "#1f2937",
              borderRadius: "12px",
              padding: "30px 20px",
              width: "250px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#60a5fa" }}>{feature.title}</h3>
            <p style={{ fontSize: "1rem", color: "#e5e7eb" }}>{feature.text}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#111827",
          color: "#f9fafb",
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #1f2937"
        }}
      >
        <p>&copy; 2026 ILES System. All rights reserved.</p>
      </footer>
    </>
>>>>>>> 7f5420a7bb6885dc5a960b899d109ea8eb86b954
  );
}

export default App;