function FeatureCard({ title, text }) {
  return (
    <div
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
      <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#60a5fa" }}>
          {title}
      </h3>
      <p style={{ fontSize: "1rem", color: "#e5e7eb" }}>
          {text}
      </p>
    </div>
  );
}


export default FeatureCard;