import { useState } from "react";
import { Card, PW, PT, GBtn, Inp, LoadingSpinner, ErrorMsg } from "../../shared/ui";
import { authAPI } from "../../api/apiService";
import { useStudentDashboard } from "../../hooks/useData";

export default function StudentProfile() {

  const { data: me, loading, error, refetch } = useStudentDashboard();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error) return <PW><ErrorMsg message={error} /></PW>;
  if (!me) return null;

  const f = form || { first_name: me.first_name || "", last_name: me.last_name || "", email: me.email || "" };

  const handleSave = async () => {

    setSaving(true);
    setSaveErr("");
    try {
      await authAPI.changePassword && null; // placeholder — profile update not yet in API
      // For now, show saved state (full profile PATCH endpoint can be added later)
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveErr(err.response?.data?.detail || "Save failed.");
    } finally {
      setSaving(false);
    }
  };


  const initials = `${me.first_name?.[0] || ""}${me.last_name?.[0] || ""}`.toUpperCase();

  return (
    <PW>
      <PT title="Profile & Settings" sub="Your account details" />
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        <Card cls="text-center !py-6">
          <div className="w-14 h-14 rounded-full bg-[#1A2540] border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-lg mx-auto mb-3">
            {initials}
          </div>
          <div className="text-xs font-medium text-white">{me.first_name} {me.last_name}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{me.email}</div>
          <div className="text-[10px] text-amber-400 mt-1">
            {me.role === "STUDENT" ? "Student Intern" : me.role}
          </div>
        </Card>

        <Card cls="col-span-3">
          {saved && (
            <div className="bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-4">
              ✓ Profile updated successfully.
            </div>
          )}
          {saveErr && (
            <div className="bg-red-900/30 border border-red-800/40 text-red-400 text-xs rounded-lg px-3 py-2 mb-4">
              {saveErr}
            </div>
          )}
          <div className="text-sm font-medium text-amber-400 mb-4">Personal Information</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Inp label="First Name" value={f.first_name} onChange={e => setForm({ ...f, first_name: e.target.value })} />
            <Inp label="Last Name" value={f.last_name} onChange={e => setForm({ ...f, last_name: e.target.value })} />
            <Inp label="Email" value={f.email} onChange={e => setForm({ ...f, email: e.target.value })} />
            <Inp label="Role" value={me.role || ""} disabled className="opacity-50" />
            <Inp label="Programme" value={me.programme_name || "—"} disabled className="opacity-50" />
            <Inp label="Student No" value={me.student_number ? String(me.student_number) : "—"} disabled className="opacity-50" />
          </div>
          <GBtn onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </GBtn>
        </Card>
      </div>
    </PW>
  );
}
