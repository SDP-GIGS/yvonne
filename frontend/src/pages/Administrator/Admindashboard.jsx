import { useNavigate } from "react-router-dom";
import {
  Card, PW, StatCard, LoadingSpinner, ErrorMsg, EmptyState, OutlineBtn
} from "../../shared/ui";
import { useAdminStats, useAdminLogs, useAdminPlacements } from "../../hooks/useData";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: usersRaw, loading: loadU, error: errU } = useAdminStats();
  const { data: logsRaw,  loading: loadL }               = useAdminLogs();
  const { data: placRaw,  loading: loadP }               = useAdminPlacements();

  if (loadU || loadL || loadP) return <PW><LoadingSpinner /></PW>;
  if (errU) return <PW><ErrorMsg message={errU} /></PW>;

  const users      = Array.isArray(usersRaw) ? usersRaw : [];
  const logs       = Array.isArray(logsRaw)  ? logsRaw  : [];
  const placements = Array.isArray(placRaw)  ? placRaw  : [];

  const students   = users.filter(u => u.role === "STUDENT");
  const active     = placements.filter(p => p.status === "ACTIVE" || p.status === "Active");

  const logsByStatus = ["DRAFT", "SUBMITTED", "REVIEWED", "APPROVED"].map(st => ({
    label: st.charAt(0) + st.slice(1).toLowerCase(),
    count: logs.filter(l => l.status === st).length,
  }));

  return (
    <PW>
      <div className="mb-7">
        <p className="text-slate-500 text-xs mb-1">System Overview</p>
        <h1 className="font-serif text-2xl text-white">Administrator Dashboard</h1>
      </div>

      <div className="flex gap-3 mb-5">
        <StatCard label="Total Students"    value={students.length}   sub="registered students"  color="text-white"       />
        <StatCard label="Total Users"       value={users.length}      sub="all roles"             color="text-blue-400"    />
        <StatCard label="Active Placements" value={active.length}     sub="currently active"      color="text-emerald-400" />
        <StatCard label="Total Logs"        value={logs.length}       sub="all time"              color="text-amber-400"   />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-medium text-white mb-3">Logs by Status</div>
          {logsByStatus.map(({ label, count }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-white">{count}</span>
              </div>
              <div className="h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${logs.length > 0 ? (count / logs.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <div className="text-sm font-medium text-white mb-3">Users by Role</div>
          {["STUDENT", "ADMIN", "WORK_SUPERVISOR", "ACADEMIC_SUPERVISOR"].map(role => {
            const count = users.filter(u => u.role === role).length;
            const label = { STUDENT: "Students", ADMIN: "Admins", WORK_SUPERVISOR: "Workplace Supervisors", ACADEMIC_SUPERVISOR: "Academic Supervisors" }[role];
            return (
              <div key={role} className="flex justify-between items-center py-2 border-b border-[#1F2E4A] last:border-0">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-xs font-medium text-white">{count}</span>
              </div>
            );
          })}
        </Card>

        <Card cls="col-span-2">
          <div className="text-sm font-medium text-white mb-3">Quick Links</div>
          <div className="grid grid-cols-4 gap-3">
            {[["users", "Manage Users"], ["placements", "Manage Placements"], ["logs", "View All Logs"], ["criteria", "Setup Criteria"]].map(([page, label]) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className="text-xs text-amber-400 border border-amber-800/40 rounded-lg px-3 py-2 hover:bg-amber-900/20 transition-colors text-left"
              >
                {label} →
              </button>
            ))}
          </div>
        </Card>
      </div>
    </PW>
  );
}
