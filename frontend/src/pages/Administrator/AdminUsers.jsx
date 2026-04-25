import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, Badge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle, PW, PT, GBtn, Table, Modal, Inp, Sel, OBtn, DBtn } from "../../shared/ui";

export default function AdminUsers() {
  const { data: rawData, setData } = useOutletContext();
  const data = rawData || { students: [], logs: [], placements: [], evaluations: [] };
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", reg:"", email:"", role:"Student", company:"", dept:"", status:"Active" });
  const handleAdd = () => {
    const newS = { id: Date.now(), name:form.name, reg:form.reg, email:form.email, program:"B.Sc. CS", company:form.company, dept:form.dept, wpSup:"TBD", acaSup:"TBD", start:"2026-06-02", end:"2026-08-29", status:form.status };
    setData(d=>({...d, students:[...(d.students || []),newS]}));
    setModal(false); setForm({ name:"",reg:"",email:"",role:"Student",company:"",dept:"",status:"Active" });
  };
  const handleRemove = (id) => setData(d=>({
    ...d,
    students: (d.students || []).filter(s=>s.id!==id),
    logs: (d.logs || []).filter(l=>l.studentId!==id),
    placements: (d.placements || []).filter(p=>p.studentId!==id),
    evaluations: (d.evaluations || []).filter(e=>e.studentId!==id)
  }));

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT title="User Management" sub="Manage all system users and roles" />
        <GBtn onClick={()=>setModal(true)}>+ Add User</GBtn>
      </div>
      <Table
        headers={["User","Reg No.","Role","Company","Status","Actions"]}
        rows={(data.students || []).map(s=>[
          <div><div className="text-xs font-medium text-white">{s.name}</div><div className="text-[10px] text-slate-500">{s.email}</div></div>,
          <span className="text-xs text-slate-400">{s.reg}</span>,
          <span className="text-xs text-amber-400/80">Student</span>,
          <span className="text-xs text-slate-400">{s.company}</span>,
          <Badge s={s.status} />,
          <DBtn onClick={()=>handleRemove(s.id)}>Remove</DBtn>
        ])}
      />
      {modal && (
        <Modal title="Add New User" onClose={()=>setModal(false)}>
          <Inp label="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Nakato Diana" />
          <Inp label="Reg Number *" value={form.reg} onChange={e=>setForm({...form,reg:e.target.value})} placeholder="e.g. 24/U/11808/PS" />
          <Inp label="Email *" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="name@mak.ac.ug" />
          <Inp label="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="e.g. NSSF Uganda" />
          <Inp label="Department" value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})} placeholder="e.g. ICT" />
          <Sel label="Status" options={["Active","Pending","Inactive"]} value={form.status} onChange={e=>setForm({...form,status:e.target.value})} />
          <div className="flex gap-2 mt-2">
            <GBtn onClick={handleAdd} disabled={!form.name||!form.reg||!form.email}>Add User</GBtn>
            <OBtn onClick={()=>setModal(false)}>Cancel</OBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}
