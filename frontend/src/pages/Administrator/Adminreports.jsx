import { PW, PT, Card, StatCard, LoadingSpinner, ErrorMsg } from "../../shared/ui";
import { useAdminStats, useAdminLogs, useAdminPlacements } from "../../hooks/useData";

export default function AdminReports() {
  const { data: usersRaw, loading: lU, error: eU } = useAdminStats();
  const { data: logsRaw,  loading: lL }            = useAdminLogs();
  const { data: placRaw,  loading: lP }            = useAdminPlacements();

  if (lU || lL || lP) return <PW><LoadingSpinner /></PW>;
  if (eU) return <PW><ErrorMsg message={eU} /></PW>;

  const users      = Array.isArray(usersRaw) ? usersRaw : [];
  const logs       = Array.isArray(logsRaw)  ? logsRaw  : [];
  const placements = Array.isArray(placRaw)  ? placRaw  : [];

  const approved   = logs.filter(l => l.status === 'APPROVED').length;
  const students   = users.filter(u => u.role === 'STUDENT').length;
  const active     = placements.filter(p => p.status === 'ACTIVE' || p.status === 'Active').length;
  const completion = logs.length > 0 ? Math.round((approved / logs.length) * 100) : 0;

  const byRole = ['STUDENT','ADMIN','WORK_SUPERVISOR','ACADEMIC_SUPERVISOR'].map(r => ({
    label: { STUDENT:'Students', ADMIN:'Admins', WORK_SUPERVISOR:'WP Supervisors', ACADEMIC_SUPERVISOR:'Acad. Supervisors' }[r],
    count: users.filter(u => u.role === r).length,
  }));

  const byStatus = ['DRAFT','SUBMITTED','REVIEWED','APPROVED'].map(s => ({
    label: s.charAt(0) + s.slice(1).toLowerCase(),
    count: logs.filter(l => l.status === s).length,
    pct: logs.length > 0 ? Math.round((logs.filter(l => l.status === s).length / logs.length) * 100) : 0,
  }));

  return (
    <PW>
      <PT title="System Reports" sub="Live analytics across all system activity" />

      <div className="flex gap-3 mb-6">
        <StatCard label="Log Completion"    value={`${completion}%`} sub="approved / total"   color="text-emerald-400" accent="#10b981" />
        <StatCard label="Active Placements" value={active}           sub="currently active"   color="text-blue-400"   accent="#3b82f6" />
        <StatCard label="Total Students"    value={students}         sub="registered"          color="text-amber-400"  accent="#f59e0b" />
        <StatCard label="Total Logs"        value={logs.length}      sub="all time"            color="text-white"      accent="#475569" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-semibold text-white mb-4">Log Status Breakdown</div>
          {byStatus.map(({ label, count, pct }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-white">{count} <span className="text-slate-600">({pct}%)</span></span>
              </div>
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <div className="text-sm font-semibold text-white mb-4">Users by Role</div>
          {byRole.map(({ label, count }) => (
            <div key={label} className="flex justify-between items-center py-2.5 border-b border-slate-800 last:border-0">
              <span className="text-xs text-slate-400">{label}</span>
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500/60 rounded-full" style={{ width: users.length > 0 ? `${(count / users.length) * 100}%` : '0%' }} />
                </div>
                <span className="text-xs font-semibold text-white w-5 text-right">{count}</span>
              </div>
            </div>
          ))}
        </Card>

        <Card cls="col-span-2">
          <div className="text-sm font-semibold text-white mb-3">Export Data</div>
          <p className="text-xs text-slate-500 mb-4">Download system data for offline reporting and analysis.</p>
          <div className="flex gap-2">
            {["Export Student List (CSV)", "Export Placement Summary (PDF)", "Export Log Report (XLSX)"].map(txt => (
              <button key={txt} className="text-xs text-amber-400 hover:bg-amber-900/10 px-3 py-2 rounded-lg border border-amber-800/20 transition-colors">
                {txt} ↓
              </button>
            ))}
          </div>
        </Card>
      </div>
    </PW>
  );
}
