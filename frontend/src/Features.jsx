 function Features() {
  return (
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
  );
}

export default Features;