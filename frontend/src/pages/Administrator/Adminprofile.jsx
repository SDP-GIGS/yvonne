import { useState } from "react";
import { PW, PT, Card, Inp, GBtn, LoadingSpinner, ErrorMsg, Label, Value } from "../../shared/ui";
import { useStudentDashboard } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export default function AdminProfile() {
  const { data: me, loading, error } = useStudentDashboard(); // reuses /me endpoint
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error)   return <PW><ErrorMsg message={error} /></PW>;

  const initials = `${me?.first_name?.[0] || 'A'}${me?.last_name?.[0] || 'D'}`.toUpperCase();

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSaved(true); setSaving(false);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PW>
      <PT title="Admin Profile" sub="Manage your administrator account" />
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        <Card cls="text-center !py-8 col-span-1">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-xl mx-auto mb-3">
            {initials}
          </div>
          <div className="text-sm font-semibold text-white">{me?.first_name} {me?.last_name}</div>
          <div className="text-[10px] text-slate-500 mt-1">{me?.email}</div>
          <div className="mt-2 inline-block text-[10px] text-amber-400 border border-amber-500/30 rounded-full px-2 py-0.5 uppercase tracking-wider">
            Administrator
          </div>
        </Card>

        <Card cls="col-span-3">
          {saved && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-4 flex items-center gap-2">✓ Profile updated successfully.</div>}
          <div className="text-sm font-semibold text-amber-400 mb-4 pb-2 border-b border-slate-800">Account Information</div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div><Label>First Name</Label><Value>{me?.first_name || '—'}</Value></div>
            <div><Label>Last Name</Label><Value>{me?.last_name || '—'}</Value></div>
            <div><Label>Email</Label><Value>{me?.email || '—'}</Value></div>
            <div><Label>Role</Label><Value>Administrator</Value></div>
          </div>
          <GBtn onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Update Profile'}</GBtn>
        </Card>
      </div>
    </PW>
  );
}
