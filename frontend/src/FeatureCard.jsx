function FeatureCard({ title, text }) {
  return (
    <div className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/7">
      <div className="mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 ring-1 ring-inset ring-white/10" />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}
export default FeatureCard;