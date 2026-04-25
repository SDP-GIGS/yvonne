import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PW, PT, GBtn, Table, Badge, DBtn, Modal, Inp, OBtn } from "../../shared/ui";

export default function AdminCriteria() {
  const { data: rawData, setData } = useOutletContext();
  const data = rawData || { criteria: [] };
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", weight:"", desc:"" });

  const handleAdd = () => {
    const newC = { id: Date.now(), name:form.name, weight:parseInt(form.weight), desc:form.desc };
    setData(d=>({...d, criteria:[...(d.criteria || []),newC]}));
    setModal(false);
  };
  const del = (id) => setData(d=>({...d,criteria:(d.criteria || []).filter(c=>c.id!==id)}));

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT title="Evaluation Criteria" sub="Setup how students will be evaluated" />
        <GBtn onClick={()=>setModal(true)}>+ New Criterion</GBtn>
      </div>
      <Table
        headers={["Name","Weight (%)","Description","Actions"]}
        rows={(data.criteria || []).map(c=>[
          <span className="text-xs font-medium text-white">{c.name}</span>,
          <span className="text-xs text-amber-400 font-semibold">{c.weight}%</span>,
          <span className="text-xs text-slate-500 max-w-sm block">{c.desc}</span>,
          <DBtn onClick={()=>del(c.id)}>Remove</DBtn>
        ])}
      />
      {modal && (
        <Modal title="Add Criterion" onClose={()=>setModal(false)}>
          <Inp label="Criterion Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Professionalism" />
          <Inp label="Weight (%) *" type="number" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="e.g. 20" />
          <Inp label="Description" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="What are the supervisors looking for?" />
          <div className="flex gap-2 mt-2">
            <GBtn onClick={handleAdd} disabled={!form.name||!form.weight}>Add Criterion</GBtn>
            <OBtn onClick={()=>setModal(false)}>Cancel</OBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}