import { COLORS, Card, PageWrap, PageTitle, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState } from "../../shared/ui";
import { useAcaEvaluations } from "../../hooks/useData";

export default function AcaEvaluationHistoryPage() {
  const { data: evalRaw, loading, error } = useAcaEvaluations();
  const evaluations = Array.isArray(evalRaw) ? evalRaw : [];

  if (loading) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  return (
    <PageWrap>
      <PageTitle title="Evaluation History" subtitle="All evaluations you have submitted" />
      {evaluations.length === 0
        ? <EmptyState message="No evaluations submitted yet." />
        : (
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: COLORS.navyLight }}>
                  {['Student', 'Score', 'Grade', 'Comments', 'Submitted'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: COLORS.muted, fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evaluations.map((ev, i) => (
                  <tr key={ev.id} style={{ borderTop: `1px solid ${COLORS.navyBorder}`, background: i % 2 === 0 ? 'transparent' : '#0E1828' }}>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: COLORS.white }}>
                      {ev.student_name || ev.student || '—'}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.white }}>
                      {ev.total_score != null ? `${ev.total_score}/100` : '—'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: 700, fontSize: 16, color: ev.grade === 'A' ? COLORS.success : COLORS.warning }}>
                        {ev.grade || '—'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: COLORS.muted, maxWidth: 200 }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ev.comments || ev.comment || '—'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: COLORS.muted }}>
                      {ev.created_at?.slice(0, 10) || ev.submitted_on || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )
      }
    </PageWrap>
  );
}
