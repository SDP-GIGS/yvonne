import { useState } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useWPDashboard, useWPStudents, useWPStudent, useWPStudentLogs,
  useReviewQueue, useWPLog, useReviewLog } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";


export default function WPProfilePage() {
  const [tab, setTab] = useState("info");
  const [form, setForm] = useState({ first_name: "Jane", last_name: "Smith", email: "jane.smith@techsolutions.com", company: "Tech Solutions Ltd", department: "IT" });
  const [pwForm, setPwForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true); setMsg(""); setErr("");
    try { setMsg("Profile updated."); } catch (e) { setErr(e.message); } finally { setSaving(false); }
  };

  const handlePw = async () => {
    if (pwForm.new_password !== pwForm.confirm_password) { setErr("Passwords do not match."); return; }
    setSaving(true); setMsg(""); setErr("");
    try { await authAPI.changePassword({ current_password: pwForm.current_password, new_password: pwForm.new_password }); setMsg("Password updated."); } catch (e) { setErr(e.message); } finally { setSaving(false); }
  };

  return (
    <PageWrap>
      <PageTitle title="Profile & Settings" />
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20, maxWidth: 820 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ textAlign: "center", padding: 24 }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: COLORS.navyLight, border: `2px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 600, color: COLORS.gold, margin: "0 auto 12px" }}>WS</div>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 2 }}>Workplace Supervisor</div>
            <div style={{ fontSize: 11, color: COLORS.gold, marginTop: 6 }}>Workplace Supervisor</div>
          </Card>
          <Card style={{ padding: 8 }}>
            {[{ id: "info", label: "Personal Info" }, { id: "password", label: "Change Password" }].map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setMsg(""); setErr(""); }} style={{ width: "100%", textAlign: "left", padding: "9px 12px", background: tab === t.id ? COLORS.navyLight : "transparent", border: "none", borderRadius: 6, marginBottom: 2, color: tab === t.id ? COLORS.white : COLORS.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "block" }}>{t.label}</button>
            ))}
          </Card>
        </div>
        <Card>
          {msg && <div style={{ background: "#0F2A20", border: "1px solid #0F3A20", color: COLORS.success, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>✓ {msg}</div>}
          {err && <div style={{ background: "#2A0F0F", border: "1px solid #5A2020", color: COLORS.danger, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>⚠ {err}</div>}
          {tab === "info" ? (
            <>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 20, color: COLORS.gold }}>Personal Information</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                {[["First Name","first_name"],["Last Name","last_name"],["Email","email"],["Company","company"],["Department","department"]].map(([label, key]) => (
                  <div key={key}><Label>{label}</Label><input style={{...inputStyle, background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', color: 'white', width: '100%'}} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} /></div>
                ))}
              </div>
              <GoldBtn onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</GoldBtn>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 20, color: COLORS.gold }}>Change Password</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 380 }}>
                {[["Current Password","current_password"],["New Password","new_password"],["Confirm New Password","confirm_password"]].map(([label, key]) => (
                  <div key={key}><Label>{label}</Label><input type="password" style={{...inputStyle, background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', color: 'white', width: '100%'}} value={pwForm[key]} onChange={e => setPwForm({ ...pwForm, [key]: e.target.value })} placeholder="••••••••" /></div>
                ))}
                <GoldBtn onClick={handlePw} disabled={saving}>{saving ? "Updating..." : "Update Password"}</GoldBtn>
              </div>
            </>
          )}
        </Card>
      </div>
    </PageWrap>
  );
}
