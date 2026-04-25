import React from 'react';

export const COLORS = {
  primary: '#1e3a8a',
  secondary: '#3b82f6',
  accent: '#f59e0b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  white: '#ffffff',
  navy: '#0f172a',
  navyLight: '#1e293b',
  navyBorder: '#334155',
  muted: '#94a3b8',
  mutedLight: '#cbd5e1',
  gold: '#fbbf24'
};

export const PageWrap = ({ children }) => (
  <div className="min-h-screen bg-[#0f172a] text-white p-6 pt-24">
    <div className="max-w-7xl mx-auto">{children}</div>
  </div>
);

export const PW = PageWrap;

export const Card = ({ children, cls = "", style = {} }) => (
  <div 
    className={`bg-[#1e293b] border border-[#334155] rounded-xl p-5 shadow-lg ${cls}`}
    style={style}
  >
    {children}
  </div>
);

export const StatCard = ({ label, value, sub, color = "text-white", accent }) => (
  <Card style={{ borderLeft: accent ? `4px solid ${accent}` : 'none' }}>
    <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    {sub && <div className="text-slate-500 text-[10px] mt-1">{sub}</div>}
  </Card>
);

export const PageTitle = ({ children }) => (
  <h1 className="text-3xl font-serif mb-8 text-white">{children}</h1>
);

export const GoldBtn = ({ children, onClick, style = {}, cls = "" }) => (
  <button 
    onClick={onClick}
    className={`bg-[#f59e0b] hover:bg-[#d97706] text-navy font-semibold py-2 px-4 rounded-lg transition-all active:scale-95 ${cls}`}
    style={style}
  >
    {children}
  </button>
);

export const GBtn = GoldBtn;

export const OutlineBtn = ({ children, onClick, style = {}, cls = "" }) => (
  <button 
    onClick={onClick}
    className={`border border-[#334155] hover:bg-[#1e293b] text-white font-medium py-2 px-4 rounded-lg transition-all ${cls}`}
    style={style}
  >
    {children}
  </button>
);

export const DangerBtn = ({ children, onClick, style = {}, cls = "" }) => (
  <button 
    onClick={onClick}
    className={`bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 font-medium py-2 px-4 rounded-lg transition-all ${cls}`}
    style={style}
  >
    {children}
  </button>
);

export const BackBtn = ({ onClick }) => (
  <button onClick={onClick} className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 text-sm">
    ← Back
  </button>
);

export const StatusBadge = ({ s, status }) => {
  const state = s || status;
  const styles = {
    Approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Accepted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Submitted: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${styles[state] || styles.Draft}`}>
      {state}
    </span>
  );
};

export const Badge = StatusBadge;

export const Label = ({ children }) => (
  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">{children}</div>
);

export const Lbl = Label;

export const Value = ({ children }) => (
  <div className="text-sm text-white font-medium">{children}</div>
);

export const Val = Value;

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
  </div>
);

export const ErrorMsg = ({ message }) => (
  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-center">
    {message || "An error occurred. Please try again."}
  </div>
);

export const EmptyState = ({ message }) => (
  <div className="text-slate-500 text-sm italic text-center p-8">
    {message || "No data available."}
  </div>
);

export const PT = ({ title, sub }) => (
  <div>
    <h1 className="text-2xl font-serif text-white">{title}</h1>
    {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
  </div>
);

export const Txta = ({ label, value, onChange, placeholder }) => (
  <div className="mb-4">
    <Label>{label}</Label>
    <textarea 
      className={textareaStyle} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
    />
  </div>
);

export const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="mb-4">
    <Label>{label}</Label>
    <input 
      type={type}
      className={inputStyle} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
    />
  </div>
);

export const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={onClose}></div>
    <div className="relative bg-navyLight border border-navyBorder rounded-2xl w-full max-w-lg p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif text-white">{title}</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>
      {children}
    </div>
  </div>
);

export const Table = ({ headers, rows }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-navyBorder">
          {headers.map((h, i) => (
            <th key={i} className="pb-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-navyBorder/50 last:border-0">
            {row.map((cell, j) => (
              <td key={j} className="py-4 align-top">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const OBtn = OutlineBtn;
export const Inp = Input;
export const DBtn = DangerBtn;

export const Sel = ({ label, options, value, onChange }) => (
  <div className="mb-4">
    <Label>{label}</Label>
    <select 
      className={inputStyle} 
      value={value} 
      onChange={onChange}
    >
      {options.map(opt => (
        <option key={opt} value={opt} className="bg-navy">{opt}</option>
      ))}
    </select>
  </div>
);

export const inputStyle = "w-full bg-[#0f172a] border border-[#334155] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors";
export const textareaStyle = "w-full bg-[#0f172a] border border-[#334155] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors min-h-[100px]";
