import { ArrowRight, CheckCircle2 } from "lucide-react";

function Hero({ onPrimaryAction, onSecondaryAction, onExploreFeatures }) {

  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.16),_transparent_30%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-100">
            Internship tracking made clearer!
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
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-2 sm:p-4 overflow-hidden flex flex-col">
              <div className="px-4 pt-2 pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Dashboard Preview</p>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden border border-white/5 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                {/* Mini Dashboard Shell Replica */}
                <div className="flex h-[340px] bg-[#0B1120] text-slate-200 text-[10px] sm:text-xs relative pointer-events-none select-none font-sans">
                  {/* Sidebar */}
                  <div className="w-[110px] sm:w-[140px] bg-[#0F172A] border-r border-slate-800 p-3 sm:p-4 flex flex-col">
                    <div className="mb-5">
                      <h1 className="text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent truncate">
                        InSync ILES
                      </h1>
                      <span className="text-[7px] sm:text-[8px] text-slate-500 uppercase tracking-widest block mt-1">Student</span>
                    </div>
                    <div className="space-y-1 sm:space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg bg-amber-500 text-[#0F172A] font-semibold shadow-lg shadow-amber-500/20">
                        <div className="w-2.5 h-2.5 rounded-[3px] bg-[#0F172A]/40"></div>
                        <span className="text-[9px] sm:text-[11px]">Dashboard</span>
                      </div>
                      {['Logbook', 'Placement', 'Evaluation'].map(item => (
                        <div key={item} className="flex items-center gap-2 px-2 sm:px-3 py-2 text-slate-400">
                          <div className="w-2.5 h-2.5 rounded-[3px] border border-slate-500"></div>
                          <span className="text-[9px] sm:text-[11px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-4 sm:p-5 overflow-hidden flex flex-col gap-3">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-slate-500 text-[8px] sm:text-[10px] mb-0.5">Good morning,</p>
                        <h1 className="font-serif text-sm sm:text-base text-white">Alex Student</h1>
                      </div>
                      <div className="text-right">
                        <div className="text-[7px] sm:text-[8px] uppercase tracking-widest text-slate-500">Field Attachment</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-1">
                      <div className="bg-[#111827] border border-slate-800/60 p-2 sm:p-3 rounded-xl shadow-sm">
                        <div className="text-[8px] text-slate-400">Weeks Approved</div>
                        <div className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1">8/13</div>
                      </div>
                      <div className="bg-[#111827] border border-slate-800/60 p-2 sm:p-3 rounded-xl shadow-sm">
                        <div className="text-[8px] text-slate-400">Awaiting</div>
                        <div className="text-xs sm:text-sm font-semibold text-blue-400 mt-1">1</div>
                      </div>
                      <div className="bg-[#111827] border border-slate-800/60 p-2 sm:p-3 rounded-xl shadow-sm">
                        <div className="text-[8px] text-slate-400">Pending</div>
                        <div className="text-xs sm:text-sm font-semibold text-amber-400 mt-1">2</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
                      <div className="bg-[#111827] border border-slate-800/60 p-3 sm:p-4 rounded-xl flex flex-col shadow-sm">
                        <div className="text-[9px] sm:text-[10px] font-medium text-white mb-3">My Placement</div>
                        <div className="space-y-3 mt-1">
                          <div>
                            <div className="text-[7px] text-slate-500 uppercase font-medium">Company</div>
                            <div className="text-[9px] sm:text-[10px] text-slate-300 mt-0.5">Tech Innovators Ltd</div>
                          </div>
                          <div>
                            <div className="text-[7px] text-slate-500 uppercase font-medium">Status</div>
                            <div className="inline-block text-[8px] font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 mt-1">Active</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#111827] border border-slate-800/60 p-3 sm:p-4 rounded-xl flex flex-col shadow-sm">
                        <div className="text-[9px] sm:text-[10px] font-medium text-white mb-2">Logbook Progress</div>
                        <div className="flex justify-between text-[8px] sm:text-[9px] mb-1.5">
                          <span className="text-slate-500">Completion</span>
                          <span className="text-white">61%</span>
                        </div>
                        <div className="h-1.5 bg-[#0B1120] rounded-full overflow-hidden mb-3">
                          <div className="h-full bg-amber-500 w-[61%] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                        </div>
                        <div className="flex-1 space-y-2 mt-1">
                          <div className="flex justify-between items-center text-[8px] sm:text-[9px]">
                            <span className="text-slate-400">Week 08</span>
                            <span className="text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/20 font-medium">Submitted</span>
                          </div>
                          <div className="flex justify-between items-center text-[8px] sm:text-[9px]">
                            <span className="text-slate-400">Week 07</span>
                            <span className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 font-medium">Approved</span>
                          </div>
                        </div>
                      </div>
                    </div>
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