import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, Badge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle, PW, PT, GBtn, Table, Modal, Txta, OBtn } from "../../shared/ui";
import { authAPI } from "../../api/apiService";

export default function StudentLogbook() {
  const { data: rawData, setData, studentId } = useOutletContext();
  const data = rawData || { logs: [], students: [] };
  const [modal, setModal] = useState(null); // null | "add" | log object
  const [form, setForm] = useState({ activities:"", skills:"", challenges:"" });
  const myLogs = (data.logs || []).filter(l => l.studentId === studentId || l.userId === studentId);

  const openAdd = () => { setForm({ activities:"", skills:"", challenges:"" }); setModal("add"); };
  const openEdit = (l) => { setForm({ activities: l.activities, skills: l.skills, challenges: l.challenges }); setModal(l); };

  const handleSave = (submitForReview) => {
    if (modal === "add") {
      const maxWeek = myLogs.reduce((m,l) => Math.max(m, l.week), 0);
      const newLog = { id: Date.now(), studentId, week: maxWeek+1, dateRange:`Week ${maxWeek+1}`, status: submitForReview ? "Submitted" : "Draft", ...form, comment:null, reviewedBy:null, deadline:"TBD" };
      setData(d => ({ ...d, logs: [...d.logs, newLog] }));
    } else {
      setData(d => ({ ...d, logs: d.logs.map(l => l.id === modal.id ? { ...l, ...form, status: submitForReview ? "Submitted" : l.status } : l) }));
    }
    setModal(null);
  };

  const handleDelete = (id) => setData(d => ({ ...d, logs: d.logs.filter(l => l.id !== id) }));

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT title="Weekly Logbook" sub="13 weeks total · Field Attachment 2026" />
        <GBtn onClick={openAdd}>+ New Log Entry</GBtn>
      </div>
      <div className="flex gap-2 mb-4">
        {["Draft","Submitted","Reviewed","Approved"].map(s => (
          <div key={s} className="flex items-center gap-1.5"><Badge s={s} /><span className="text-[10px] text-slate-500">{myLogs.filter(l=>l.status===s).length}</span></div>
        ))}
      </div>
      <Table
        headers={["Week","Date Range","Status","Deadline","Comment","Actions"]}
        rows={myLogs.map(l => [
          <span className="text-xs font-medium text-white">Week {l.week}</span>,
          <span className="text-xs text-slate-400">{l.dateRange}</span>,
          <Badge s={l.status} />,
          <span className={`text-xs ${l.status==="Draft"?"text-amber-400":"text-slate-500"}`}>{l.deadline}</span>,
          <span className="text-xs text-slate-500 max-w-[140px] truncate block">{l.comment ? `"${l.comment}"` : "—"}</span>,
          <div className="flex gap-2">
            {(l.status==="Draft"||l.status==="Submitted") && <button onClick={()=>openEdit(l)} className="text-[10px] border border-amber-800/40 text-amber-400 px-2 py-1 rounded hover:bg-amber-900/20">Edit</button>}
            <button onClick={()=>handleDelete(l.id)} className="text-[10px] border border-red-900/40 text-red-400 px-2 py-1 rounded hover:bg-red-900/20">Del</button>
          </div>
        ])}
      />
      {modal && (
        <Modal title={modal==="add" ? "New Log Entry" : `Edit Week ${modal.week}`} onClose={()=>setModal(null)}>
          <Txta label="Activities Performed *" value={form.activities} onChange={e=>setForm({...form,activities:e.target.value})} placeholder="Describe your activities..." />
          <Txta label="Skills Learned *" value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})} placeholder="Skills acquired this week..." />
          <Txta label="Challenges Faced" value={form.challenges} onChange={e=>setForm({...form,challenges:e.target.value})} placeholder="Difficulties and how you resolved them..." />
          <div className="flex gap-2 mt-1">
            <OBtn onClick={()=>handleSave(false)}>Save as Draft</OBtn>
            <GBtn onClick={()=>handleSave(true)} disabled={!form.activities||!form.skills}>Submit for Review</GBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}
