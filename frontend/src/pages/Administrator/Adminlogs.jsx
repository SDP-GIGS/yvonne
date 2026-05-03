import { useState } from "react";
import { PW, PT, Table, Badge, LoadingSpinner, ErrorMsg, EmptyState } from "../../shared/ui";
import { useAdminLogs } from "../../hooks/useData";
import api from "../../api/apiService";

export default function AdminLogs() {
  const { data: logsRaw, loading, error, refetch } = useAdminLogs();
  const logs = Array.isArray(logsRaw) ? logsRaw : [];
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? logs : logs.filter(l => l.status === filter);

  const handleOverride = async (id, newStatus) => {
    try {
      await api.patch(`/api/logs/${id}/`, { status: newStatus });
      await refetch();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this log entry?")) return;
    try {
      await api.delete(`/api/logs/${id}/`);
      await refetch();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to delete log.");
    }
  };

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error)   return <PW><ErrorMsg message={error} /></PW>;

  return (
    <PW>
      <PT title="All Logbooks" sub="System-wide view of all student logs" />
      <div className="flex gap-2 mb-4">
        {["All", "DRAFT", "SUBMITTED", "REVIEWED", "APPROVED"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-[10px] px-3 py-1 rounded-full border transition-colors ${
              filter === s
                ? "bg-amber-500 text-[#0B1120] border-amber-500 font-semibold"
                : "text-slate-500 border-[#1F2E4A] hover:border-slate-500"
            }`}
          >
            {s === "All" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0
        ? <EmptyState message="No logs found for this filter." />
        : (
          <Table
            headers={["Student", "Week", "Period", "Status", "Override Status", "Actions"]}
            rows={filtered.map(l => [
              <div>
                <div className="text-xs font-medium text-white">{l.student_email || l.student || "—"}</div>
                <div className="text-[10px] text-slate-500">Week {l.week_number}</div>
              </div>,
              <span className="text-xs text-white">Week {l.week_number}</span>,
              <span className="text-xs text-slate-400">{l.start_date} → {l.end_date}</span>,
              <Badge s={l.status} />,
              <select
                value={l.status}
                onChange={e => handleOverride(l.id, e.target.value)}
                className="bg-[#0B1120] border border-[#1F2E4A] text-white text-[10px] rounded-md px-2 py-1 outline-none"
              >
                {["DRAFT", "SUBMITTED", "REVIEWED", "APPROVED"].map(st => (
                  <option key={st} value={st}>{st.charAt(0) + st.slice(1).toLowerCase()}</option>
                ))}
              </select>,
              <button
                onClick={() => handleDelete(l.id)}
                className="text-[10px] border border-red-900/40 text-red-400 px-2 py-1 rounded hover:bg-red-900/20"
              >
                Delete
              </button>
            ])}
          />
        )
      }
    </PW>
  );
}
