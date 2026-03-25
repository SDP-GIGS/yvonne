import { useState } from "react";
 const [hover, setHover] = useState(false);
function Hero() {
  return (

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
          Get Started now
        </button>
      </section>
  );
}
export default Hero;
