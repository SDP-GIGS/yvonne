import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, Badge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle, PW, PT, Val, Lbl } from "../../shared/ui";
import { authAPI } from "../../api/apiService";

export default function StudentPlacement() {
  const { data: rawData, studentId } = useOutletContext();
  const data = rawData || { placements: [], students: [] };
  const p = (data.placements || []).find(x => x.studentId === studentId);
  if (!p) return <PW><PT title="My Placement" /><p className="text-slate-500 text-sm">No placement assigned yet.</p></PW>;
  return (
    <PW>
      <PT title="My Placement" sub="Your current internship placement details" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <Card>
            <div className="flex justify-between items-start mb-5">
              <div><div className="font-serif text-xl text-white">{p.company}</div><div className="text-xs text-slate-500 mt-0.5">Kampala, Uganda</div></div>
              <Badge s={p.status} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[["Department",p.dept],["Role","Software Dev Intern"],["Duration","13 Weeks"],["Start Date",p.start],["End Date",p.end],["Academic Year","2025/2026"]].map(([k,v])=>(
                <div key={k}><Lbl>{k}</Lbl><Val>{v}</Val></div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="text-sm font-medium text-white mb-3">Attachment Progress</div>
            <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Time elapsed</span><span className="text-white">38%</span></div>
            <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden mb-1">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-400" style={{width:"38%"}} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-600"><span>{p.start}</span><span>{p.end}</span></div>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <div className="text-sm font-medium text-white mb-3">Workplace Supervisor</div>
            <div className="w-12 h-12 rounded-full bg-[#1A2540] border border-[#1F2E4A] flex items-center justify-center text-amber-400 font-bold mb-3">
              {p.wpSup.split(" ").map(w=>w[0]).slice(0,2).join("")}
            </div>
            <div className="font-medium text-sm text-white mb-1">{p.wpSup}</div>
            <div className="text-xs text-slate-500">IT Department Lead</div>
          </Card>
          <Card cls="bg-[#0D1A28]">
            <div className="text-xs text-slate-400 font-medium mb-1">Note</div>
            <p className="text-xs text-slate-500 leading-relaxed">Contact your supervisor for logbook concerns or daily activity guidance.</p>
          </Card>
        </div>
      </div>
    </PW>
  );
}