import { useState } from "react";
import {
  Card, PW, PT, GBtn, Table, Modal, Inp, Sel, OBtn, DBtn,
  Badge, LoadingSpinner, ErrorMsg, EmptyState
} from "../../shared/ui";
import { useAdminStats } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";
import api from "../../api/apiService";

export default function AdminUsers() {
  const { data: usersRaw, loading, error, refetch } = useAdminStats();
  const users = Array.isArray(usersRaw) ? usersRaw : [];

  const [modal, setModal]   = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");
  const [form, setForm]     = useState({
    first_name: "", last_name: "", email: "",
    password: "", role: "STUDENT"
  });

  const ROLE_LABELS = {
    STUDENT: "Student",
    ADMIN: "Administrator",
    WORK_SUPERVISOR: "Workplace Supervisor",
    ACADEMIC_SUPERVISOR: "Academic Supervisor",
  };

  const handleAdd = async () => {
    setSaving(true);
    setSaveErr("");
    try {
      await api.post("/api/users/users/", form);
      await refetch();
      setModal(false);
      setForm({ first_name: "", last_name: "", email: "", password: "", role: "STUDENT" });
    } catch (err) {
      const data = err.response?.data || {};
      const msg = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join(" | ");
      setSaveErr(msg || "Failed to create user.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this user?")) return;
    try {
      await api.patch(`/api/users/users/${id}/`, { is_active: false });
      await refetch();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to deactivate user.");
    }
  };

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error)   return <PW><ErrorMsg message={error} /></PW>;

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT title="User Management" sub="All registered users in the system" />
        <GBtn onClick={() => setModal(true)}>+ Add User</GBtn>
      </div>

      {users.length === 0
        ? <EmptyState message="No users found." />
        : (
          <Table
            headers={["Name", "Email", "Role", "Status", "Actions"]}
            rows={users.map(u => [
              <div>
                <div className="text-xs font-medium text-white">{u.first_name} {u.last_name}</div>
              </div>,
              <span className="text-xs text-slate-400">{u.email}</span>,
              <span className="text-xs text-amber-400/80">{ROLE_LABELS[u.role] || u.role}</span>,
              <Badge s={u.is_active ? "Active" : "Inactive"} />,
              <DBtn onClick={() => handleDeactivate(u.id)} disabled={!u.is_active}>
                {u.is_active ? "Deactivate" : "Inactive"}
              </DBtn>
            ])}
          />
        )
      }

      {modal && (
        <Modal title="Add New User" onClose={() => setModal(false)}>
          {saveErr && (
            <div className="mb-3 text-xs text-red-400 border border-red-900/40 bg-red-900/10 rounded-lg px-3 py-2">
              {saveErr}
            </div>
          )}
          <Inp label="First Name *" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} placeholder="e.g. Diana" />
          <Inp label="Last Name *"  value={form.last_name}  onChange={e => setForm({ ...form, last_name: e.target.value })}  placeholder="e.g. Nakato" />
          <Inp label="Email *"      value={form.email}       onChange={e => setForm({ ...form, email: e.target.value })}       placeholder="name@example.com" />
          <Inp label="Password *"   value={form.password}    onChange={e => setForm({ ...form, password: e.target.value })}    placeholder="Min 8 characters" type="password" />
          <Sel
            label="Role"
            options={["STUDENT", "ADMIN", "WORK_SUPERVISOR", "ACADEMIC_SUPERVISOR"]}
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          />
          <div className="flex gap-2 mt-2">
            <GBtn
              onClick={handleAdd}
              disabled={saving || !form.first_name || !form.last_name || !form.email || !form.password}
            >
              {saving ? "Creating..." : "Create User"}
            </GBtn>
            <OBtn onClick={() => setModal(false)}>Cancel</OBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}
