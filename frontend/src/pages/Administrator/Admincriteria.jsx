import { useState } from "react";
import { PW, PT, GBtn, Table, DBtn, Modal, Inp, OBtn, EmptyState } from "../../shared/ui";

const DEFAULT_CRITERIA = [
  { id: 1, name: "Technical Skills",    weight: 30, desc: "Ability to apply technical knowledge in the workplace." },
  { id: 2, name: "Professionalism",     weight: 20, desc: "Punctuality, dress code, and workplace etiquette." },
  { id: 3, name: "Communication",       weight: 20, desc: "Written and verbal communication effectiveness." },
  { id: 4, name: "Problem Solving",     weight: 15, desc: "Ability to identify and resolve challenges independently." },
  { id: 5, name: "Teamwork",            weight: 15, desc: "Collaboration and contribution to group tasks." },
];

export default function AdminCriteria() {
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState({ name: "", weight: "", desc: "" });

  const totalWeight = criteria.reduce((s, c) => s + Number(c.weight), 0);

  const handleAdd = () => {
    if (!form.name || !form.weight) return;
    setCriteria(prev => [...prev, { id: Date.now(), name: form.name, weight: Number(form.weight), desc: form.desc }]);
    setForm({ name: "", weight: "", desc: "" });
    setModal(false);
  };

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <div>
          <PT title="Evaluation Criteria" sub="Define how students are scored by supervisors" />
          <div className={`text-xs mt-1 ${totalWeight === 100 ? 'text-emerald-400' : totalWeight > 100 ? 'text-red-400' : 'text-amber-400'}`}>
            Total weight: {totalWeight}% {totalWeight === 100 ? '✓ balanced' : totalWeight > 100 ? '— exceeds 100%' : '— not yet 100%'}
          </div>
        </div>
        <GBtn onClick={() => setModal(true)}>+ Add Criterion</GBtn>
      </div>

      {criteria.length === 0
        ? <EmptyState message="No criteria defined yet." />
        : (
          <Table
            headers={["Criterion", "Weight", "Description", "Actions"]}
            rows={criteria.map(c => [
              <span className="text-sm font-medium text-white">{c.name}</span>,
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${c.weight}%` }} />
                </div>
                <span className="text-xs font-semibold text-amber-400">{c.weight}%</span>
              </div>,
              <span className="text-xs text-slate-500 max-w-xs block">{c.desc}</span>,
              <DBtn onClick={() => setCriteria(p => p.filter(x => x.id !== c.id))}>Remove</DBtn>
            ])}
          />
        )
      }

      {modal && (
        <Modal title="Add Evaluation Criterion" onClose={() => setModal(false)}>
          <Inp label="Criterion Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Professionalism" />
          <Inp label="Weight (%) *" type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="e.g. 20" />
          <Inp label="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="What supervisors should look for..." />
          <div className="flex gap-2 mt-2">
            <GBtn onClick={handleAdd} disabled={!form.name || !form.weight}>Add Criterion</GBtn>
            <OBtn onClick={() => setModal(false)}>Cancel</OBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}
