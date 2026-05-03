import { useState } from "react";
import { PW, PT, Card, Inp, GBtn, LoadingSpinner, ErrorMsg, Label, Value } from "../../shared/ui";
import { useAcaDashboard } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export default function AcaProfilePage() {
  const { data: me, loading, error } = useAcaDashboard();
  const [tab, setTab]   = useState('info');
  const [msg, setMsg]   = useState('');
  const [err, setErr]   = useState('');
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error)   return <PW><ErrorMsg message={error} /></PW>;

  const initials = `${me?.first_name?.[0] || ''}${me?.last_name?.[0] || ''}`.toUpperCase() || 'AS';

  const handlePw = async () => {
    if (pwForm.new_password !== pwForm.confirm_password) { setErr('Passwords do not match.'); return; }
    setSaving(true); setMsg(''); setErr('');
    try {
      await authAPI.changePassword({ current_password: pwForm.current_password, new_password: pwForm.new_password });
      setMsg('Password updated successfully.');
      setPwForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (e) { setErr(e.response?.data?.detail || 'Failed to update password.'); }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  return (
    <PW>
      <PT title="Profile & Settings" sub="Manage your academic supervisor account" />
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        <div className="flex flex-col gap-3">
          <Card cls="text-center !py-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-xl mx-auto mb-3">{initials}</div>
            <div className="text-sm font-semibold text-white">{me?.first_name} {me?.last_name}</div>
            <div className="text-[10px] text-slate-500 mt-1">{me?.email}</div>
            <div className="mt-2 inline-block text-[10px] text-amber-400 border border-amber-500/30 rounded-full px-2 py-0.5 uppercase tracking-wider">Acad. Supervisor</div>
          </Card>
          <Card cls="!p-2">
            {[{ id: 'info', label: 'Personal Info' }, { id: 'password', label: 'Change Password' }].map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setMsg(''); setErr(''); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${tab === t.id ? 'bg-amber-500/10 text-amber-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                {t.label}
              </button>
            ))}
          </Card>
        </div>
        <Card cls="col-span-3">
          {msg && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-4">✓ {msg}</div>}
          {err && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg px-3 py-2 mb-4">⚠ {err}</div>}
          {tab === 'info' ? (
            <div>
              <div className="text-sm font-semibold text-amber-400 mb-4 pb-2 border-b border-slate-800">Personal Information</div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div><Label>First Name</Label><Value>{me?.first_name || '—'}</Value></div>
                <div><Label>Last Name</Label><Value>{me?.last_name || '—'}</Value></div>
                <div><Label>Email</Label><Value>{me?.email || '—'}</Value></div>
                <div><Label>Role</Label><Value>Academic Supervisor</Value></div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-sm font-semibold text-amber-400 mb-4 pb-2 border-b border-slate-800">Change Password</div>
              <div className="flex flex-col gap-1 max-w-sm mb-4">
                <Inp type="password" label="Current Password" value={pwForm.current_password} onChange={e => setPwForm({ ...pwForm, current_password: e.target.value })} placeholder="••••••••" />
                <Inp type="password" label="New Password"     value={pwForm.new_password}     onChange={e => setPwForm({ ...pwForm, new_password: e.target.value })}     placeholder="••••••••" />
                <Inp type="password" label="Confirm Password" value={pwForm.confirm_password} onChange={e => setPwForm({ ...pwForm, confirm_password: e.target.value })} placeholder="••••••••" />
              </div>
              <GBtn onClick={handlePw} disabled={saving}>{saving ? 'Updating...' : 'Update Password'}</GBtn>
            </div>
          )}
        </Card>
      </div>
    </PW>
  );
}
