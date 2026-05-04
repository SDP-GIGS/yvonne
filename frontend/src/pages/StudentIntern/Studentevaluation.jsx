import { PW, PT, Card, StatCard, LoadingSpinner, ErrorMsg, EmptyState, Label, Value } from "../../shared/ui";
import { useStudentEvaluations } from "../../hooks/useData";

export default function StudentEvaluation() {

  const { data: evalRaw, loading, error } = useStudentEvaluations();
  const evaluations = Array.isArray(evalRaw) ? evalRaw : [];

  if (loading) return <PW><LoadingSpinner /></PW>;
  if (error) return <PW><ErrorMsg message={error} /></PW>;

  if (evaluations.length === 0) return (
    <PW>
      <PT title="Evaluation & Scores" sub="Performance review by supervisors" />
      <EmptyState message="No evaluation has been submitted for you yet. Your supervisor will evaluate you at the end of your placement." />
    </PW>
  );

  const ev = evaluations[0];

  return (
    <PW>
      <PT title="Evaluation & Scores" sub="Performance review by supervisors" />
      <div className="flex gap-3 mb-5">
        <StatCard label="Final Score" value={ev.total_score != null ? `${ev.total_score}/100` : '—'} sub="cumulative score" color="text-amber-400" accent="#f59e0b" />
        <StatCard label="Grade" value={ev.grade || '—'} sub="academic standing" color="text-white" accent="#475569" />
        <StatCard label="Status" value="Evaluated" sub="final assessment" color="text-emerald-400" accent="#10b981" />
        <StatCard label="Submitted On" value={ev.created_at?.slice(0, 10) || '—'} sub="evaluation date" color="text-slate-400" accent="#334155" />
      </div>
      <Card>
        <div className="text-sm font-semibold text-white mb-3">Evaluation Details</div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Evaluator</Label><Value>{ev.evaluator_name || ev.evaluator || '—'}</Value></div>
          <div><Label>Comments</Label><Value>{ev.comments || ev.comment || 'No comments provided.'}</Value></div>
        </div>
      </Card>
    </PW>
  );
}
