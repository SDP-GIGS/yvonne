import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PW, PT, GBtn, Table, Badge, DBtn, Modal, Sel, Inp, OBtn } from "../../shared/ui";

export default function AdminPlacements() {
  const { data: rawData, setData } = useOutletContext();
  const data = rawData || { students: [], placements: [] };
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ studentId:"", company:"", dept:"", wpSup:"", start:"", end:"", status:"Active" });
  
  const handleAdd = () => {
    const sid = parseInt(form.studentId);
    const s = (data.students || []).find(s=>s.id===sid);
    if (!s) return;
    const p = { id:Date.now(), studentId:sid, studentName:s.name, studentReg:s.reg, company:form.company, dept:form.dept, wpSup:form.wpSup, start:form.start, end:form.end, status:form.status };
    setData(d=>({...d,placements:[...(d.placements || []),p]}));
    setModal(false);
  };
  const handleRemove = (id) => setData(d=>({...d,placements:(d.placements || []).filter(p=>p.id!==id)}));

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT title="Placement Management" sub="Assign and manage student internship placements" />
        <GBtn onClick={()=>setModal(true)}>+ New Placement</GBtn>
      </div>
      <Table
        headers={["Student","Company","Department","WP Supervisor","Period","Status","Actions"]}
        rows={(data.placements || []).map(p=>[
          <div><div className="text-xs font-medium text-white">{p.studentName}</div><div className="text-[10px] text-slate-500">{p.studentReg}</div></div>,
          <span className="text-xs text-slate-400">{p.company}</span>,
          <span className="text-xs text-slate-400">{p.dept}</span>,
          <span className="text-xs text-slate-400">{p.wpSup}</span>,
          <span className="text-xs text-slate-500">{p.start} – {p.end}</span>,
          <Badge s={p.status} />,
          <DBtn onClick={()=>handleRemove(p.id)}>Remove</DBtn>
        ])}
      />
      {modal && (
        <Modal title="New Placement" onClose={()=>setModal(false)}>
          <Sel label="Student *" options={["","...select",...(data.students || []).map(s=>`${s.id}|${s.name}`)]} value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value.split("|")[0]})} />
          <Inp label="Company Name *"    value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="e.g. Bank of Uganda" />
          <Inp label="Department *"      value={form.dept}    onChange={e=>setForm({...form,dept:e.target.value})}    placeholder="e.g. ICT" />
          <Inp label="WP Supervisor"     value={form.wpSup}   onChange={e=>setForm({...form,wpSup:e.target.value})}   placeholder="e.g. Ms. Apio" />
          <Inp label="Start Date" type="date" value={form.start} onChange={e=>setForm({...form,start:e.target.value})} />
          <Inp label="End Date"   type="date" value={form.end}   onChange={e=>setForm({...form,end:e.target.value})} />
          <div className="flex gap-2 mt-2">
            <GBtn onClick={handleAdd} disabled={!form.studentId||!form.company||!form.dept}>Save Placement</GBtn>
            <OBtn onClick={()=>setModal(false)}>Cancel</OBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}