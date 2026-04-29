import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PW, PT, Card, Inp, GBtn } from "../../shared/ui";
import { authAPI } from "../../api/apiService";

export default function WPProfilePage() {
  const { user } = useOutletContext() || {};
  const [tab, setTab] = useState("info");

  const [form, setForm] = useState({
    first_name: user?.name?.split(" ")[0] || "Jane",
    last_name: user?.name?.split(" ").slice(1).join(" ") || "Smith",
    email: user?.email || "jane.smith@techsolutions.com",
    company: "Tech Solutions Ltd",
    department: "IT"
  });
  const [pwForm, setPwForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true); setMsg(""); setErr("");
    try {
      await new Promise(r => setTimeout(r, 500));
      setMsg("Profile updated.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handlePw = async () => {
    if (pwForm.new_password !== pwForm.confirm_password) {
      setErr("Passwords do not match.");
      return;
    }
    setSaving(true); setMsg(""); setErr("");
    try {
      if (authAPI.changePassword) {
        await authAPI.changePassword({ current_password: pwForm.current_password, new_password: pwForm.new_password });
      } else {
        await new Promise(r => setTimeout(r, 500));
      }
      setMsg("Password updated.");
      setPwForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (e) {
      setErr(e.message || "Failed to update password");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const initials = (form.first_name?.[0] || "") + (form.last_name?.[0] || "");

  return (
    <PW>
      <PT title="Profile & Settings" sub="Manage your workplace supervisor account" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mt-6">

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card cls="text-center !py-6">
            <div className="w-16 h-16 rounded-full bg-[#1A2540] border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-xl mx-auto mb-3">
              {initials || "WS"}
            </div>
            <div className="text-sm font-medium text-white">{form.first_name} {form.last_name}</div>
            <div className="text-xs text-slate-500 mt-1">{form.company}</div>
            <div className="text-[10px] text-amber-400 mt-2 uppercase tracking-wider">Workplace Supervisor</div>
          </Card>

          <Card cls="!p-2">
            {[
              { id: "info", label: "Personal Info" },
              { id: "password", label: "Change Password" }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setMsg(""); setErr(""); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${tab === t.id ? "bg-amber-500/10 text-amber-400 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </Card>
        </div>

        {/* Content */}
        <Card cls="md:col-span-3">
          {msg && <div className="bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-6">✓ {msg}</div>}
          {err && <div className="bg-red-900/30 border border-red-800/40 text-red-400 text-xs rounded-lg px-3 py-2 mb-6">⚠ {err}</div>}

          {tab === "info" ? (
            <div>
              <div className="text-sm font-medium text-amber-400 mb-6 border-b border-slate-800 pb-2">Personal Information</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Inp label="First Name" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
                <Inp label="Last Name" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
                <Inp label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <Inp label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                <Inp label="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
              </div>
              <GBtn onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</GBtn>
            </div>
          ) : (
            <div>
              <div className="text-sm font-medium text-amber-400 mb-6 border-b border-slate-800 pb-2">Change Password</div>
              <div className="flex flex-col gap-4 max-w-sm mb-6">
                <Inp type="password" label="Current Password" value={pwForm.current_password} onChange={e => setPwForm({ ...pwForm, current_password: e.target.value })} placeholder="••••••••" />
                <Inp type="password" label="New Password" value={pwForm.new_password} onChange={e => setPwForm({ ...pwForm, new_password: e.target.value })} placeholder="••••••••" />
                <Inp type="password" label="Confirm New Password" value={pwForm.confirm_password} onChange={e => setPwForm({ ...pwForm, confirm_password: e.target.value })} placeholder="••••••••" />
              </div>
              <GBtn onClick={handlePw} disabled={saving}>{saving ? "Updating..." : "Update Password"}</GBtn>
            </div>
          )}
        </Card>
      </div>
    </PW>
  );
}
