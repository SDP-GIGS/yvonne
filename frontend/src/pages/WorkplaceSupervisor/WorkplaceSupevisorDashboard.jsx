import { useNavigate } from "react-router-dom";
import {
  Card, PageWrap, StatCard, StatusBadge, GoldBtn, OutlineBtn,
  LoadingSpinner, ErrorMsg, EmptyState, COLORS
} from "../../shared/ui";
import { useWorkplaceDashboard, useReviewQueue, useWPStudents } from "../../hooks/useData";

export function WorkplaceSupervisorDashboard() {
  const navigate = useNavigate();
  const { data: me,      loading: loadMe,    error: errMe }    = useWorkplaceDashboard();
  const { data: queueRaw, loading: loadQ }                     = useReviewQueue();
  const { data: studRaw,  loading: loadS }                     = useWPStudents();

  if (loadMe || loadQ || loadS) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (errMe) return <PageWrap><ErrorMsg message={errMe} /></PageWrap>;

  const queue    = Array.isArray(queueRaw) ? queueRaw.filter(l => l.status === "SUBMITTED") : [];
  const students = Array.isArray(studRaw)  ? studRaw.filter(u => u.role === "STUDENT")      : [];
  const approved = Array.isArray(queueRaw) ? queueRaw.filter(l => l.status === "APPROVED").length : 0;

  return (
    <PageWrap>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>Welcome back,</div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: COLORS.white, fontWeight: 400 }}>
            {me?.first_name} {me?.last_name}
          </h1>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{me?.email}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Assigned Students"  value={students.length} sub="under your supervision" accent={COLORS.white}   />
        <StatCard label="Pending Review"     value={queue.length}    sub="logs awaiting review"   accent={COLORS.warning} />
        <StatCard label="Approved This Week" value={approved}        sub="logs approved"           accent={COLORS.success} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Pending Reviews</div>
            <OutlineBtn onClick={() => navigate("review")} style={{ fontSize: 11, padding: "5px 12px" }}>View All</OutlineBtn>
          </div>
          {queue.length === 0
            ? <EmptyState message="No logs pending review." />
            : queue.slice(0, 4).map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyBorder}` }}>
                <div>
                  <div style={{ fontSize: 13, color: COLORS.white }}>{item.student_email || item.student || "Student"}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Week {item.week_number} · {item.start_date}</div>
                </div>
                <GoldBtn onClick={() => navigate("review")} style={{ fontSize: 11, padding: "5px 12px" }}>Review</GoldBtn>
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
                <StatusBadge status={s.is_active ? "Active" : "Inactive"} />
              </div>
            ))
          }
        </Card>
      </div>
    </PageWrap>
  );
}
