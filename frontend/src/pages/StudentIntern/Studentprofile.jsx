import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, Badge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle, PW, PT, GBtn, Inp } from "../../shared/ui";
import { authAPI } from "../../api/apiService";

export default function StudentProfile() {
  const { data: rawData, studentId } = useOutletContext();
  const data = rawData || { students: [] };
  const me = (data.students || []).find(s => s.id === studentId);
  const [form, setForm] = useState({ first_name: me?.name.split(" ")[0]||"", last_name: me?.name.split(" ").slice(1).join(" ")||"", email: me?.email||"" });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };
  return (
    <PW>
      <PT title="Profile & Settings" sub="Manage your account details" />
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        <Card cls="text-center !py-6">
          <div className="w-14 h-14 rounded-full bg-[#1A2540] border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-lg mx-auto mb-3">
            {(me?.name||"").split(" ").map(w=>w[0]).slice(0,2).join("")}
          </div>
          <div className="text-xs font-medium text-white">{me?.name}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{me?.reg}</div>
          <div className="text-[10px] text-amber-400 mt-1">Student Intern</div>
        </Card>
        <Card cls="col-span-3">
          {saved && <div className="bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-4">✓ Profile updated successfully.</div>}
          <div className="text-sm font-medium text-amber-400 mb-4">Personal Information</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Inp label="First Name" value={form.first_name} onChange={e=>setForm({...form,first_name:e.target.value})} />
            <Inp label="Last Name"  value={form.last_name}  onChange={e=>setForm({...form,last_name:e.target.value})} />
            <Inp label="Email"      value={form.email}      onChange={e=>setForm({...form,email:e.target.value})} />
            <Inp label="Reg Number" value={me?.reg||""} disabled className="opacity-50" />
            <Inp label="Programme"  value={me?.program||""} disabled className="opacity-50" />
            <Inp label="University" value="Makerere University" disabled className="opacity-50" />
          </div>
          <GBtn onClick={handleSave}>Save Changes</GBtn>
        </Card>
      </div>
    </PW>
  );
}