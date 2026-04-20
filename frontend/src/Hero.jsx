import { ArrowRight, CheckCircle2 } from "lucide-react";

function Hero({ onPrimaryAction, onSecondaryAction, onExploreFeatures }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.16),_transparent_30%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-100">
            <CheckCircle2 className="h-4 w-4" />
            Internship tracking made clear
          </div>

          <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            A cleaner way to log, review, and manage internship progress.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            InSync-ILES gives students, supervisors, and admins a focused workspace for weekly logs, approvals, and performance evaluation.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onPrimaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:from-sky-400 hover:to-indigo-400"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Sign in
            </button>
            <button
              onClick={onExploreFeatures}
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3.5 font-medium text-sky-200 transition-colors duration-200 hover:text-white"
            >
              Explore features
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Weekly logs</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Supervisor review</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Progress reporting</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-transparent blur-3xl" />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Preview</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Current week</p>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-semibold text-white">Week 08</p>
                      <p className="text-sm text-slate-400">3 logs awaiting review</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">On track</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Completion</p>
                    <p className="mt-2 text-3xl font-semibold text-white">78%</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Evaluation</p>
                    <p className="mt-2 text-3xl font-semibold text-white">A-</p>
                    <p className="mt-3 text-sm text-slate-300">Supervisor feedback and progress scores stay aligned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;