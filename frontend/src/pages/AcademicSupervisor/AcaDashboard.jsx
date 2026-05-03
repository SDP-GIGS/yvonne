import { useNavigate } from "react-router-dom";
import {
  Card, PageWrap, StatCard, GoldBtn, OutlineBtn,
  LoadingSpinner, ErrorMsg, EmptyState, COLORS
} from "../../shared/ui";
import { useAcaDashboard, useAcaStudents, useReviewQueue } from "../../hooks/useData";

export function AcaDashboardPage() {
  const navigate = useNavigate();
  const { data: me,      loading: loadMe, error: errMe } = useAcaDashboard();
  const { data: studRaw, loading: loadS }                = useAcaStudents();
  const { data: logsRaw, loading: loadL }                = useReviewQueue();

  if (loadMe || loadS || loadL) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (errMe) return <PageWrap><ErrorMsg message={errMe} /></PageWrap>;

  const students = Array.isArray(studRaw) ? studRaw.filter(u => u.role === "STUDENT") : [];
  const logs     = Array.isArray(logsRaw) ? logsRaw : [];
  const pending  = logs.filter(l => l.status === "SUBMITTED");
  const done     = logs.filter(l => l.status === "APPROVED" || l.status === "REVIEWED");

  return (
    <PageWrap>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>Welcome back,</div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: COLORS.white, fontWeight: 400 }}>
          {me?.first_name} {me?.last_name}
        </h1>
        <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{me?.email}</div>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Assigned Students"  value={students.length} sub="under your supervision" accent={COLORS.white}   />
        <StatCard label="Pending Review"     value={pending.length}  sub="logs submitted"         accent={COLORS.warning} />
        <StatCard label="Reviewed / Approved" value={done.length}    sub="completed reviews"      accent={COLORS.success} />
        <StatCard label="Total Logs"         value={logs.length}     sub="all time"               accent={COLORS.gold}    />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Pending Reviews</div>
            <OutlineBtn onClick={() => navigate("students")} style={{ fontSize: 11, padding: "5px 12px" }}>View All</OutlineBtn>
          </div>
          {pending.length === 0
            ? <EmptyState message="No logs pending review." />
            : pending.slice(0, 4).map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyBorder}` }}>
                <div>
                  <div style={{ fontSize: 13, color: COLORS.white }}>{item.student_email || item.student || "Student"}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Week {item.week_number} · {item.start_date}</div>
                </div>
                <GoldBtn onClick={() => navigate("students")} style={{ fontSize: 11, padding: "5px 12px" }}>Review</GoldBtn>
              </div>
            ))
          }
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>My Students</div>
            <OutlineBtn onClick={() => navigate("students")} style={{ fontSize: 11, padding: "5px 12px" }}>View All</OutlineBtn>
          </div>
          {students.length === 0
            ? <EmptyState message="No students assigned yet." />
            : students.slice(0, 4).map(s => (
              <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyBorder}` }}>
                <div>
                  <div style={{ fontSize: 13, color: COLORS.white }}>{s.first_name} {s.last_name}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>{s.email}</div>
                </div>
              </div>
            ))
          }
        </Card>
      </div>
    </PageWrap>
  );
}
