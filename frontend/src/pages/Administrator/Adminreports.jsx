import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PW, PT, Card, StatCard, COLORS } from "../../shared/ui";

export default function AdminReports() {
  const { data } = useOutletContext() || {};
  return (
    <PW>
      <PT title="System Reports" sub="Analytics and data exports" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Overall Completion" value="68%" sub="average logbook progress" color="text-emerald-400" />
        <StatCard label="Avg Evaluation Score" value="74/100" sub="across all students" color="text-amber-400" />
        <StatCard label="Placement Rate" value="84%" sub="of total interns" color="text-blue-400" />
        <StatCard label="System Load" value="Normal" sub="server status" color="text-slate-400" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-medium text-white mb-4">Top Performing Departments</div>
          {[["Computing & IT", 92], ["Electrical Eng", 88], ["Business Admin", 85], ["Statistics", 82]].map(([d,v])=>(
            <div key={d} className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{d}</span>
                <span className="text-white">{v}%</span>
              </div>
              <div className="h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{width:`${v}%`}} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div className="text-sm font-medium text-white mb-4">Export Data</div>
          <p className="text-xs text-slate-500 mb-4">Download system data in CSV or PDF format for offline analysis.</p>
          <div className="flex flex-col gap-2">
            {["Export Student List (CSV)", "Export Placement Summary (PDF)", "Export Evaluation Results (XLSX)"].map(txt=>(
              <button key={txt} className="text-left text-xs text-amber-400 hover:bg-amber-900/10 px-3 py-2 rounded-lg border border-amber-800/20 transition-colors">{txt} ↓</button>
            ))}
          </div>
        </Card>
      </div>
    </PW>
  );
}
