import { useState } from "react";
import {
  PW, PT, GBtn, Table, Badge, DBtn,
  Modal, Inp, OBtn, LoadingSpinner,
  ErrorMsg, EmptyState
} from "../../shared/ui";

import { useAdminPlacements, useAdminStats } from "../../hooks/useData";
import { adminAPI } from "../../api/apiService";

export default function AdminPlacements() {
  const { data: placRaw, loading: loadP, error: errP, refetch: refetchP } = useAdminPlacements();
  const { data: usersRaw, loading: loadU } = useAdminStats();

  const placements = Array.isArray(placRaw) ? placRaw : [];
  const users = Array.isArray(usersRaw) ? usersRaw : [];

  const students = users.filter(u => u.role === "STUDENT");

  const academicSupervisors = users.filter(
    u => u.role === "ACADEMIC_SUPERVISOR"
  );

  const workplaceSupervisors = users.filter(
    u => u.role === "WORK_SUPERVISOR"
  );

  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const [form, setForm] = useState({
    student: "",
    company_name: "",
    department: "",
    start_date: "",
    end_date: "",
    status: "pending",
    academic_supervisor: "",
    workplace_supervisor: ""
  });

  const handleAdd = async () => {
    setSaving(true);
    setSaveErr("");

    try {
      await adminAPI.assignPlacement(form);
      await refetchP();

      setModal(false);
      setForm({
        student: "",
        company_name: "",
        department: "",
        start_date: "",
        end_date: "",
        status: "pending",
        academic_supervisor: "",
        workplace_supervisor: ""
      });
    } catch (err) {
      const data = err.response?.data || {};
      const msg = Object.entries(data)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join(" | ");

      setSaveErr(msg || "Failed to create placement.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this placement?")) return;

    try {
      await adminAPI.deletePlacement(id);
      await refetchP();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to remove placement.");
    }
  };

  if (loadP || loadU) return <PW><LoadingSpinner /></PW>;
  if (errP) return <PW><ErrorMsg message={errP} /></PW>;

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT
          title="Placement Management"
          sub="Assign students with supervisors and manage internships"
        />
        <GBtn onClick={() => setModal(true)}>+ New Placement</GBtn>
      </div>

      {placements.length === 0 ? (
        <EmptyState message="No placements yet. Click '+ New Placement' to assign one." />
      ) : (
        <Table
          headers={[
            "Student",
            "Company",
            "Department",
            "Academic Supervisor",
            "Workplace Supervisor",
            "Period",
            "Status",
            "Actions"
          ]}
          rows={placements.map(p => [
            <div>
              <div className="text-xs font-medium text-white">
                {p.student_name || p.student || "—"}
              </div>
              <div className="text-[10px] text-slate-500">
                {p.student_email || ""}
              </div>
            </div>,

            <span className="text-xs text-slate-400">
              {p.company_name || "—"}
            </span>,

            <span className="text-xs text-slate-400">
              {p.department || "—"}
            </span>,

            <span className="text-xs text-slate-400">
              {p.academic_supervisor_email || "—"}
            </span>,

            <span className="text-xs text-slate-400">
              {p.workplace_supervisor_email || "—"}
            </span>,

            <span className="text-xs text-slate-500">
              {p.start_date} – {p.end_date}
            </span>,

            <Badge s={p.status} />,

            <DBtn onClick={() => handleRemove(p.id)}>
              Remove
            </DBtn>
          ])}
        />
      )}

      {modal && (
        <Modal title="New Placement" onClose={() => setModal(false)}>
          {saveErr && (
            <div className="mb-3 text-xs text-red-400 border border-red-900/40 bg-red-900/10 rounded-lg px-3 py-2">
              {saveErr}
            </div>
          )}

          {/* Student */}
          <div className="mb-3">
            <label className="text-xs text-slate-400 mb-1 block">
              Student *
            </label>
            <select
              className="w-full bg-[#0B1120] border border-[#1F2E4A] text-white text-xs rounded-lg px-3 py-2"
              value={form.student}
              onChange={e => setForm({ ...form, student: e.target.value })}
            >
              <option value="">— Select student —</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Supervisor */}
          <div className="mb-3">
            <label className="text-xs text-slate-400 mb-1 block">
              Academic Supervisor
            </label>
            <select
              className="w-full bg-[#0B1120] border border-[#1F2E4A] text-white text-xs rounded-lg px-3 py-2"
              value={form.academic_supervisor}
              onChange={e =>
                setForm({ ...form, academic_supervisor: e.target.value })
              }
            >
              <option value="">— Select academic supervisor —</option>
              {academicSupervisors.map(s => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Workplace Supervisor */}
          <div className="mb-3">
            <label className="text-xs text-slate-400 mb-1 block">
              Workplace Supervisor
            </label>
            <select
              className="w-full bg-[#0B1120] border border-[#1F2E4A] text-white text-xs rounded-lg px-3 py-2"
              value={form.workplace_supervisor}
              onChange={e =>
                setForm({ ...form, workplace_supervisor: e.target.value })
              }
            >
              <option value="">— Select workplace supervisor —</option>
              {workplaceSupervisors.map(s => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name}
                </option>
              ))}
            </select>
          </div>

          <Inp
            label="Company Name *"
            value={form.company_name}
            onChange={e =>
              setForm({ ...form, company_name: e.target.value })
            }
          />

          <Inp
            label="Department"
            value={form.department}
            onChange={e =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <Inp
            label="Start Date"
            type="date"
            value={form.start_date}
            onChange={e =>
              setForm({ ...form, start_date: e.target.value })
            }
          />

          <Inp
            label="End Date"
            type="date"
            value={form.end_date}
            onChange={e =>
              setForm({ ...form, end_date: e.target.value })
            }
          />

          <div className="flex gap-2 mt-3">
            <GBtn
              onClick={handleAdd}
              disabled={saving || !form.student || !form.company_name}
            >
              {saving ? "Saving..." : "Save Placement"}
            </GBtn>
            <OBtn onClick={() => setModal(false)}>Cancel</OBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}