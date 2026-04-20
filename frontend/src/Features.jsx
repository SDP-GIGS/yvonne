import FeatureCard from "./FeatureCard";

function Features() {
  const features = [
    { title: "Logging", text: "Capture weekly activities in a structured flow that is easy to scan and review." },
    { title: "Evaluation", text: "Review progress with clear metrics for supervisors, students, and administrators." },
    { title: "Reports", text: "Turn internship data into clean summaries that support faster decisions." }
  ];

  return (
    <section id="features" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">Platform features</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Built for the workflow your interns actually use.</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            The landing page now introduces the product with clearer structure and better spacing so users know where to go next.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;