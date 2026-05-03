import { PW, PT, Card, Badge, StatCard, LoadingSpinner, ErrorMsg, EmptyState, Lbl, Val } from "../../shared/ui";
import { useStudentPlacement } from "../../hooks/useData";

export default function StudentPlacement() {
  const { data: placRaw, loading, error } = useStudentPlacement();
  const placements = Array.isArray(placRaw) ? placRaw : [];
  const p = placements[0] || null;

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error)   return <PW><ErrorMsg message={error} /></PW>;

  if (!p) return (
    <PW>
      <PT title="My Placement" sub="Your current internship placement details" />
      <EmptyState message="No placement has been assigned to you yet. Contact your administrator." />
    </PW>
  );

  const start = new Date(p.start_date);
  const end   = new Date(p.end_date);
  const now   = new Date();
  const total = end - start;
  const elapsed = Math.min(Math.max(now - start, 0), total);
  const pct = total > 0 ? Math.round((elapsed / total) * 100) : 0;

  return (
    <PW>
      <PT title="My Placement" sub="Your current internship placement details" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <Card>
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="font-semibold text-xl text-white">{p.company_name || p.company || 'Company'}</div>
                <div className="text-xs text-slate-500 mt-0.5">{p.department || 'Department not specified'}</div>
              </div>
              <Badge s={p.status || 'ACTIVE'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                ['Department', p.department || '—'],
                ['Start Date', p.start_date || '—'],
                ['End Date', p.end_date || '—'],
                ['Status', p.status || '—'],
              ].map(([k, v]) => (
                <div key={k}><Lbl>{k}</Lbl><Val>{v}</Val></div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold text-white mb-3">Attachment Progress</div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500">Time elapsed</span>
              <span className="text-white font-semibold">{pct}%</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden mb-1">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-400 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>{p.start_date}</span>
              <span>{p.end_date}</span>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <div className="text-sm font-semibold text-white mb-3">Placement Info</div>
            <div className="space-y-3">
              <div><Lbl>Company</Lbl><Val>{p.company_name || '—'}</Val></div>
              <div><Lbl>Department</Lbl><Val>{p.department || '—'}</Val></div>
              <div><Lbl>Status</Lbl><Val>{p.status || '—'}</Val></div>
            </div>
          </Card>
          <Card cls="bg-[#0D1A28]">
            <div className="text-xs text-slate-400 font-medium mb-1">Note</div>
            <p className="text-xs text-slate-500 leading-relaxed">Contact your administrator if any placement details need to be updated.</p>
          </Card>
        </div>
      </div>
    </PW>
  );
}
