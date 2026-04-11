import FeatureCard from "./FeatureCard";

function Features() {
  const features = [
    { title: "Logging", text: "Keep track of all intern activities efficiently." },
    { title: "Evaluation", text: "Rate performance with detailed evaluation metrics." },
    { title: "Reports", text: "Generate insightful reports for supervisors and interns." }
  ];

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
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          text={feature.text}
        />  
      ))}
    </section>
  );
}

export default Features;