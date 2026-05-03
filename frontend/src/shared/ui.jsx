import React from 'react';

export const COLORS = {
  primary: '#1e3a8a', secondary: '#3b82f6', accent: '#f59e0b',
  success: '#10b981', warning: '#f59e0b', danger: '#ef4444',
  white: '#ffffff', navy: '#0f172a', navyLight: '#1e293b',
  navyBorder: '#334155', muted: '#94a3b8', mutedLight: '#cbd5e1', gold: '#fbbf24'
};

export const PageWrap = ({ children }) => (
  <div className="min-h-screen bg-[#0f172a] text-white p-6 pt-8">
    <div className="max-w-7xl mx-auto">{children}</div>
  </div>
);
export const PW = PageWrap;

export const Card = ({ children, cls = "", style = {} }) => (
  <div className={`bg-[#1e293b] border border-[#334155] rounded-xl p-5 shadow-lg ${cls}`} style={style}>
    {children}
  </div>
);

export const StatCard = ({ label, value, sub, color = "text-white", accent }) => (
  <Card cls="flex-1 min-w-0" style={{ borderLeft: accent ? `3px solid ${accent}` : 'none' }}>
    <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">{label}</div>
    <div className={`text-2xl font-bold tabular-nums ${color}`}>{value ?? '—'}</div>
    {sub && <div className="text-slate-600 text-[10px] mt-1">{sub}</div>}
  </Card>
);

export const PageTitle = ({ title, subtitle, children }) => (
  <div className="mb-7">
    <h1 className="text-2xl font-semibold text-white tracking-tight">{title || children}</h1>
    {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
  </div>
);
export const PT = ({ title, sub }) => (
  <div className="mb-7">
    <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
    {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
  </div>
);

export const GoldBtn = ({ children, onClick, style = {}, cls = "", disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-semibold py-2 px-4 rounded-lg transition-all active:scale-95 text-sm ${cls}`} style={style}>
    {children}
  </button>
);
export const GBtn = GoldBtn;

export const OutlineBtn = ({ children, onClick, style = {}, cls = "", disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`border border-slate-700 hover:bg-slate-800 hover:border-slate-600 disabled:opacity-50 text-slate-300 font-medium py-2 px-4 rounded-lg transition-all text-sm ${cls}`} style={style}>
    {children}
  </button>
);
export const OBtn = OutlineBtn;

export const DangerBtn = ({ children, onClick, style = {}, cls = "", disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-medium py-1.5 px-3 rounded-lg transition-all text-xs ${cls}`} style={style}>
    {children}
  </button>
);
export const DBtn = DangerBtn;

export const BackBtn = ({ onClick }) => (
  <button onClick={onClick} className="text-slate-400 hover:text-white mb-5 flex items-center gap-2 text-sm transition-colors">
    ← Back
  </button>
);

// Badge handles both UPPERCASE ("APPROVED") and title case ("Approved")
export const StatusBadge = ({ s, status }) => {
  const raw = s || status || '';
  const map = {
    APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    SUBMITTED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Submitted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    REVIEWED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Reviewed: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    DRAFT: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    Draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Inactive: 'bg-red-500/10 text-red-400 border-red-500/20',
    Rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    Complete: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };
  const label = raw.charAt(0) + raw.slice(1).toLowerCase();
  return (
    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border font-medium ${map[raw] || map[label] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
      {label}
    </span>
  );
};
export const Badge = StatusBadge;

export const Label = ({ children }) => (
  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{children}</div>
);
export const Lbl = Label;

export const Value = ({ children }) => (
  <div className="text-sm text-white font-medium">{children}</div>
);
export const Val = Value;

export const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center p-16 gap-3">
    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-amber-500"></div>
    <span className="text-slate-600 text-xs">Loading...</span>
  </div>
);

export const ErrorMsg = ({ message }) => (
  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-2">
    <span>⚠</span> {message || "An error occurred. Please try again."}
  </div>
);

export const EmptyState = ({ message }) => (
  <div className="text-slate-600 text-sm italic text-center py-12 border border-dashed border-slate-800 rounded-xl">
    {message || "No data available."}
  </div>
);

export const Input = ({ label, value, onChange, type = "text", placeholder, disabled, className = "" }) => (
  <div className="mb-3">
    {label && <Label>{label}</Label>}
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} disabled={disabled}
      className={`w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors disabled:opacity-50 ${className}`}
    />
  </div>
);
export const Inp = Input;

export const Textarea = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div className="mb-3">
    {label && <Label>{label}</Label>}
    <textarea
      rows={rows} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors resize-none"
    />
  </div>
);
export const Txta = Textarea;

export const Select = ({ label, options, value, onChange }) => (
  <div className="mb-3">
    {label && <Label>{label}</Label>}
    <select
      value={value} onChange={onChange}
      className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/60 transition-colors"
    >
      {options.map(opt => (
        <option key={opt} value={opt} className="bg-[#0f172a]">{opt}</option>
      ))}
    </select>
  </div>
);
export const Sel = Select;

export const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <button onClick={onClose} className="text-slate-500 hover:text-white text-xl transition-colors leading-none">✕</button>
      </div>
      {children}
    </div>
  </div>
);

export const Table = ({ headers, rows }) => (
  <div className="w-full overflow-x-auto rounded-xl border border-[#334155]">
    <table className="w-full text-left">
      <thead>
        <tr className="bg-[#0f172a] border-b border-[#334155]">
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={headers.length} className="px-4 py-10 text-center text-slate-600 text-sm italic">No records found.</td></tr>
        ) : rows.map((row, i) => (
          <tr key={i} className={`border-b border-[#334155]/50 last:border-0 ${i % 2 === 0 ? '' : 'bg-[#0f172a]/30'}`}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 align-middle">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const inputStyle = "w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/60 transition-colors";
export const textareaStyle = () => ({ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', color: 'white', fontSize: 13, outline: 'none', resize: 'vertical', minHeight: 90, fontFamily: 'inherit', marginBottom: 12 });
