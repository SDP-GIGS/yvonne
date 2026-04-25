import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PW, PT, Card, Inp, GBtn } from "../../shared/ui";

export default function AdminProfile() {
  const { user } = useOutletContext() || {};
  const [form, setForm] = useState({ first_name: "System", last_name: "Admin", email: "admin@insync.com" });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };
  return (
    <PW>
      <PT title="Admin Profile" sub="Manage your administrative account" />
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        <Card cls="text-center !py-6">
          <div className="w-14 h-14 rounded-full bg-[#1A2540] border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-lg mx-auto mb-3">
            AD
          </div>
          <div className="text-xs font-medium text-white">System Admin</div>
          <div className="text-[10px] text-slate-500 mt-0.5">University HQ</div>
          <div className="text-[10px] text-amber-400 mt-1">Administrator</div>
        </Card>
        <Card cls="col-span-3">
          {saved && <div className="bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-4">✓ Profile updated successfully.</div>}
          <div className="text-sm font-medium text-amber-400 mb-4">Account Information</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Inp label="First Name" value={form.first_name} onChange={e=>setForm({...form,first_name:e.target.value})} />
            <Inp label="Last Name"  value={form.last_name}  onChange={e=>setForm({...form,last_name:e.target.value})} />
            <Inp label="Email"      value={form.email}      onChange={e=>setForm({...form,email:e.target.value})} />
            <Inp label="Role"       value="Super Admin" disabled className="opacity-50" />
          </div>
          <GBtn onClick={handleSave}>Update Profile</GBtn>
        </Card>
      </div>
    </PW>
  );
}