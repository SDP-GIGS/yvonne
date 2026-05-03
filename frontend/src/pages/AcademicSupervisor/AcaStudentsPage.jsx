import { COLORS, Card, PageWrap, PageTitle, GoldBtn, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState } from "../../shared/ui";
import { useAcaStudents } from "../../hooks/useData";

export default function AcaStudentsPage() {
  const { data: studRaw, loading, error } = useAcaStudents();
  const students = Array.isArray(studRaw) ? studRaw.filter(u => u.role === 'STUDENT') : [];

  if (loading) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  return (
    <PageWrap>
      <PageTitle title="My Students" subtitle="Students assigned for academic supervision" />
      {students.length === 0
        ? <EmptyState message="No students assigned yet." />
        : (
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: COLORS.navyLight }}>
                  {['Student', 'Email', 'Programme', 'Student No.', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: COLORS.muted, fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} style={{ borderTop: `1px solid ${COLORS.navyBorder}`, background: i % 2 === 0 ? 'transparent' : '#0E1828' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.white }}>{s.first_name} {s.last_name}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: COLORS.muted }}>{s.email}</td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: COLORS.mutedLight }}>{s.programme_name || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: COLORS.mutedLight }}>{s.student_number || '—'}</td>
                    <td style={{ padding: '14px 16px' }}><StatusBadge status={s.is_active ? 'Active' : 'Inactive'} /></td>
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
