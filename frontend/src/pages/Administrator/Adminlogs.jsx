import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PW, PT, Table, Badge, DBtn } from "../../shared/ui";

export default function AdminLogs() {
  const { data: rawData, setData } = useOutletContext();
  const data = rawData || { logs: [], students: [] };
  const [filter, setFilter] = useState("All");
  const filtered = filter==="All" ? (data.logs || []) : (data.logs || []).filter(l=>l.status===filter);
  const override = (id, st) => setData(d=>({...d,logs:d.logs.map(l=>l.id===id?{...l,status:st}:l)}));
  const del = (id) => setData(d=>({...d,logs:d.logs.filter(l=>l.id!==id)}));

  return (
    <PW>
      <PT title="All Logbooks" sub="System-wide view of all student logs" />
      <div className="flex gap-2 mb-4">
        {["All","Draft","Submitted","Reviewed","Approved"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)} className={`text-[10px] px-3 py-1 rounded-full border transition-colors ${filter===s?"bg-amber-500 text-[#0B1120] border-amber-500 font-semibold":"text-slate-500 border-[#1F2E4A] hover:border-slate-500"}`}>{s}</button>
        ))}
      </div>
      <Table
        headers={["Student","Week","Date Range","Current Status","Override Status","Actions"]}
        rows={filtered.map(l=>{
          const s = (data.students || []).find(s=>s.id===l.studentId);
          return [
            <div><div className="text-xs font-medium text-white">{s?.name}</div><div className="text-[10px] text-slate-500">{s?.reg}</div></div>,
            <span className="text-xs text-white">Week {l.week}</span>,
            <span className="text-xs text-slate-400">{l.dateRange}</span>,
            <Badge s={l.status} />,
            <select value={l.status} onChange={e=>override(l.id,e.target.value)} className="bg-[#0B1120] border border-[#1F2E4A] text-white text-[10px] rounded-md px-2 py-1 outline-none">
              {["Draft","Submitted","Reviewed","Approved"].map(st=><option key={st} value={st}>{st}</option>)}
            </select>,
            <DBtn onClick={()=>del(l.id)}>Delete</DBtn>
          ];
        })}
      />
    </PW>
  );
}
