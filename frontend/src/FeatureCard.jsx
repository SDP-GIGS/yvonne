function Features() {
  const features = [
    {
      title: "Logging",
      text: "Keep track of all intern activities efficiently."
    },
    {
      title: "Evaluation",
      text: "Rate performance with detailed evaluation metrics."
    },
    {
      title: "Reports",
      text: "Generate insightful reports for supervisors and interns."
    }
  ];

  return (
    <section style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      padding: "60px 20px",
      background: "#111827",
      color: "#f9fafb"
    }}>
      {features.map((feature) => (
        <div
          key={feature.title}
          style={{
            background: "#1f2937",
            padding: "30px",
            borderRadius: "12px",
            width: "250px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
          }}
        >
          <h3 style={{ color: "#60a5fa", marginBottom: "10px" }}>
            {feature.title}
          </h3>
          <p>{feature.text}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;