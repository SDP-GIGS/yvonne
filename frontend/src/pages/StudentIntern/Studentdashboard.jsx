import { useNavigate } from "react-router-dom";
import {
  Card, PW, StatCard, Badge, LoadingSpinner, ErrorMsg, EmptyState,
  Lbl, Val, GBtn, PT
} from "../../shared/ui";
import { useStudentDashboard, useStudentLogs, useStudentPlacement } from "../../hooks/useData";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { data: me, loading: loadMe, error: errMe } = useStudentDashboard();
  const { data: logsRaw, loading: loadLogs } = useStudentLogs();
  const { data: placementsRaw, loading: loadPlace } = useStudentPlacement();

  if (loadMe || loadLogs || loadPlace) return <PW><LoadingSpinner /></PW>;
  if (errMe) return <PW><ErrorMsg message={errMe} /></PW>;
  if (!me) return <PW><EmptyState /></PW>;

  const logs = Array.isArray(logsRaw) ? logsRaw : [];
  const placements = Array.isArray(placementsRaw) ? placementsRaw : [];
  const myPlacement = placements[0] || null;

  const approved  = logs.filter(l => l.status === 'APPROVED').length;
  const submitted = logs.filter(l => l.status === 'SUBMITTED').length;
  const drafts    = logs.filter(l => l.status === 'DRAFT').length;
  const pending   = logs.filter(l => l.status === 'DRAFT').slice(0, 3);

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <div>
          <p className="text-slate-500 text-xs mb-1">Good morning,</p>
          <h1 className="font-serif text-2xl text-white">
            {me.first_name} {me.last_name}
          </h1>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Field Attachment</div>
          <div className="text-amber-400 text-xs mt-0.5">{me.email}</div>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        <StatCard label="Weeks Approved"   value={`${approved}/13`} sub="logs approved"      color="text-emerald-400" />
        <StatCard label="Awaiting Review"  value={submitted}         sub="submitted logs"     color="text-blue-400"   />
        <StatCard label="Pending"          value={drafts}            sub="draft / not started" color="text-amber-400"  />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Placement card */}
        <Card>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-white">My Placement</span>
            {myPlacement && <Badge s={myPlacement.status} />}
          </div>
          {myPlacement ? (
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Company",    myPlacement.company_name || myPlacement.company || "—"],
                ["Department", myPlacement.department || "—"],
                ["Supervisor", myPlacement.supervisor_name || "—"],
                ["Status",     myPlacement.status || "—"],
              ].map(([k, v]) => (
                <div key={k}><Lbl>{k}</Lbl><Val>{v}</Val></div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-xs">No placement assigned yet.</p>
          )}
          <button
            onClick={() => navigate("placement")}
            className="mt-3 text-xs text-amber-400 border border-amber-800/40 px-3 py-1.5 rounded-lg hover:bg-amber-900/20 transition-colors"
          >
            View Details →
          </button>
        </Card>

        {/* Logbook progress */}
        <Card>
          <div className="text-sm font-medium text-white mb-3">Logbook Progress</div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500">Completion</span>
            <span className="text-white">{Math.round((approved / 13) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-[#0B1120] rounded-full overflow-hidden mb-3">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(approved / 13) * 100}%` }} />
          </div>
          {logs.slice(0, 3).map(l => (
            <div key={l.id} className="flex justify-between items-center py-2 border-b border-[#1F2E4A] last:border-0">
              <span className="text-xs text-slate-400">
                Week {l.week_number} — {l.start_date} to {l.end_date}
              </span>
              <Badge s={l.status} />
            </div>
          ))}
          <button
            onClick={() => navigate("logbook")}
            className="mt-2 text-xs text-amber-400 border border-amber-800/40 px-3 py-1.5 rounded-lg hover:bg-amber-900/20 transition-colors"
          >
            View All Logs →
          </button>
        </Card>

        {/* Action required */}
        <Card cls="border-amber-900/30 col-span-2">
          <div className="text-sm font-medium text-amber-400 mb-3">⚠ Action Required</div>
          {pending.length === 0
            ? <p className="text-slate-500 text-xs">All caught up! No draft logs pending.</p>
            : pending.map(l => (
              <div key={l.id} className="flex justify-between items-center bg-amber-900/10 rounded-lg px-3 py-2 mb-2">
                <div>
                  <div className="text-xs text-white">Week {l.week_number} logbook</div>
                  <div className="text-[10px] text-slate-500">Status: Draft</div>
                </div>
                <GBtn onClick={() => navigate("logbook")} cls="!py-1 !px-3">Submit</GBtn>
              </div>
            ))
          }
        </Card>
      </div>
    </PW>
  );
}
