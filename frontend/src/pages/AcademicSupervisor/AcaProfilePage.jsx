import { useState, useEffect } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, Badge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle, PW, PT, GBtn, Inp } from "../../shared/ui";
import { authAPI } from "../../api/apiService";

export default function AcaProfilePage() {
  const [form, setForm] = useState({ first_name: "Robert", last_name: "King", email: "r.king@mak.ac.ug" });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };
  return (
    <PW>
      <PT title="Profile & Settings" sub="Manage your academic supervisor account" />
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        <Card cls="text-center !py-6">
          <div className="w-14 h-14 rounded-full bg-[#1A2540] border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-lg mx-auto mb-3">
            RK
          </div>
          <div className="text-xs font-medium text-white">Dr. Robert King</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Faculty of Computing</div>
          <div className="text-[10px] text-amber-400 mt-1">Academic Supervisor</div>
        </Card>
        <Card cls="col-span-3">
          {saved && <div className="bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-4">✓ Profile updated successfully.</div>}
          <div className="text-sm font-medium text-amber-400 mb-4">Personal Information</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Inp label="First Name" value={form.first_name} onChange={e=>setForm({...form,first_name:e.target.value})} />
            <Inp label="Last Name"  value={form.last_name}  onChange={e=>setForm({...form,last_name:e.target.value})} />
            <Inp label="Email"      value={form.email}      onChange={e=>setForm({...form,email:e.target.value})} />
            <Inp label="Faculty"    value="Computing & IT" disabled className="opacity-50" />
            <Inp label="University" value="Makerere University" disabled className="opacity-50" />
          </div>
          <GBtn onClick={handleSave}>Save Changes</GBtn>
        </Card>
      </div>
    </PW>
  );
}
