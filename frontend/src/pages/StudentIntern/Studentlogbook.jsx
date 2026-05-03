import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Card, PW, PT, GBtn, Table, Modal, Txta, OBtn,
  Badge, LoadingSpinner, ErrorMsg, EmptyState
} from "../../shared/ui";
import { studentAPI } from "../../api/apiService";
import { useStudentLogs } from "../../hooks/useData";

export default function StudentLogbook() {
  const { studentId } = useOutletContext();
  const { data: logsRaw, loading, error, refetch } = useStudentLogs();
  const logs = Array.isArray(logsRaw) ? logsRaw : [];

  const [modal, setModal] = useState(null); // null | "add" | log object
  const [form, setForm] = useState({ week_number: "", start_date: "", end_date: "", activities_performed: "", lessons_learned: "", challenges_faced: "" });
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const openAdd = () => {
    const nextWeek = logs.length > 0 ? Math.max(...logs.map(l => l.week_number)) + 1 : 1;
    setForm({ week_number: nextWeek, start_date: "", end_date: "", activities_performed: "", lessons_learned: "", challenges_faced: "" });
    setSaveErr("");
    setModal("add");
  };

  const openEdit = (l) => {
    setForm({
      week_number: l.week_number,
      start_date: l.start_date,
      end_date: l.end_date,
      activities_performed: l.activities_performed || "",
      lessons_learned: l.lessons_learned || "",
      challenges_faced: l.challenges_faced || "",
    });
    setSaveErr("");
    setModal(l);
  };

  const handleSave = async (submitForReview) => {
    setSaving(true);
    setSaveErr("");
    try {
      const payload = {
        ...form,
        status: submitForReview ? "SUBMITTED" : "DRAFT",
      };
      if (modal === "add") {
        await studentAPI.submitLog(payload);
      } else {
        await studentAPI.updateLog(modal.id, payload);
      }
      await refetch();
      setModal(null);
    } catch (err) {
      const msg = err.response?.data
        ? Object.entries(err.response.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join(" | ")
        : "Save failed. Please try again.";
      setSaveErr(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this log entry?")) return;
    try {
      await studentAPI.updateLog(id, { status: "DRAFT" });
      // Actually delete
      const resp = await fetch(`http://localhost:8000/api/logs/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("authTokens")).access}` }
      });
      if (resp.ok) await refetch();
    } catch {
      await refetch();
    }
  };

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error) return <PW><ErrorMsg message={error} /></PW>;

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT title="Weekly Logbook" sub="Submit and track your weekly activity logs" />
        <GBtn onClick={openAdd}>+ New Log Entry</GBtn>
      </div>

      <div className="flex gap-2 mb-4">
        {["DRAFT", "SUBMITTED", "REVIEWED", "APPROVED"].map(s => (
          <div key={s} className="flex items-center gap-1.5">
            <Badge s={s} />
            <span className="text-[10px] text-slate-500">{logs.filter(l => l.status === s).length}</span>
          </div>
        ))}
      </div>

      {logs.length === 0
        ? <EmptyState message="No log entries yet. Click '+ New Log Entry' to get started." />
        : (
          <Table
            headers={["Week", "Period", "Activities", "Status", "Actions"]}
            rows={logs.map(l => [
              <span className="text-xs font-medium text-white">Week {l.week_number}</span>,
              <span className="text-xs text-slate-400">{l.start_date} → {l.end_date}</span>,
              <span className="text-xs text-slate-400 max-w-[180px] truncate block">
                {l.activities_performed || "—"}
              </span>,
              <Badge s={l.status} />,
              <div className="flex gap-2">
                {(l.status === "DRAFT" || l.status === "SUBMITTED") && (
                  <button
                    onClick={() => openEdit(l)}
                    className="text-[10px] border border-amber-800/40 text-amber-400 px-2 py-1 rounded hover:bg-amber-900/20"
                  >Edit</button>
                )}
                {l.status === "DRAFT" && (
                  <button
                    onClick={() => handleDelete(l.id)}
                    className="text-[10px] border border-red-900/40 text-red-400 px-2 py-1 rounded hover:bg-red-900/20"
                  >Del</button>
                )}
              </div>
            ])}
          />
        )
      }

      {modal && (
        <Modal
          title={modal === "add" ? "New Log Entry" : `Edit Week ${modal.week_number}`}
          onClose={() => setModal(null)}
        >
          {saveErr && (
            <div className="mb-3 text-xs text-red-400 border border-red-900/40 bg-red-900/10 rounded-lg px-3 py-2">
              {saveErr}
            </div>
          )}
          <div className="grid grid-cols-3 gap-3 mb-2">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Week #</label>
              <input
                type="number" min="1" max="13"
                className="w-full bg-[#0B1120] border border-[#1F2E4A] rounded-lg px-3 py-2 text-white text-xs"
                value={form.week_number}
                onChange={e => setForm({ ...form, week_number: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Start Date</label>
              <input
                type="date"
                className="w-full bg-[#0B1120] border border-[#1F2E4A] rounded-lg px-3 py-2 text-white text-xs"
                value={form.start_date}
                onChange={e => setForm({ ...form, start_date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">End Date</label>
              <input
                type="date"
                className="w-full bg-[#0B1120] border border-[#1F2E4A] rounded-lg px-3 py-2 text-white text-xs"
                value={form.end_date}
                onChange={e => setForm({ ...form, end_date: e.target.value })}
              />
            </div>
          </div>
          <Txta
            label="Activities Performed *"
            value={form.activities_performed}
            onChange={e => setForm({ ...form, activities_performed: e.target.value })}
            placeholder="Describe your activities this week..."
          />
          <Txta
            label="Lessons Learned *"
            value={form.lessons_learned}
            onChange={e => setForm({ ...form, lessons_learned: e.target.value })}
            placeholder="What did you learn this week..."
          />
          <Txta
            label="Challenges Faced"
            value={form.challenges_faced}
            onChange={e => setForm({ ...form, challenges_faced: e.target.value })}
            placeholder="Any difficulties and how you resolved them..."
          />
          <div className="flex gap-2 mt-1">
            <OBtn onClick={() => handleSave(false)} disabled={saving}>
              {saving ? "Saving..." : "Save as Draft"}
            </OBtn>
            <GBtn
              onClick={() => handleSave(true)}
              disabled={saving || !form.activities_performed || !form.lessons_learned}
            >
              {saving ? "Submitting..." : "Submit for Review"}
            </GBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}
