import { useState, useEffect } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useAcaDashboard, useAcaStudents, useAcaStudent, useAcaStudentLogs,
  useAcaEvaluations, useEvalCriteria, useSubmitEvaluation } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export function AcaEvaluationFormPage({ studentId, onBack, onDone }) {
  const { data: student  } = useAcaStudent(studentId);
  const { data: criteria, loading } = useEvalCriteria();
  const { mutate: submitEvaluation, loading: submitting, error: submitErr } = useSubmitEvaluation();

  const [scores,  setScores]  = useState({});
  const [comment, setComment] = useState("");

  // Auto-calculate weighted total
  const total = (criteria || []).reduce((sum, c) => {
    const raw = parseFloat(scores[c.id]) || 0;
    return sum + Math.min(raw, c.weight);
  }, 0);

  const allFilled = (criteria || []).every(c => scores[c.id] !== undefined && scores[c.id] !== "");

const handleSubmit = async () => {
  const payload = {
    placement_id: student?.placement_id,   // ← needs to come from the student fetch
    scores: (criteria || []).map(c => ({ criterion_id: c.id, score: parseFloat(scores[c.id]) })),
    comment,
  };
  const result = await submitEvaluation(payload);
  if (result) onDone?.();
};

  if (loading) return <PageWrap><BackBtn onClick={onBack} /><LoadingSpinner /></PageWrap>;

  return (
    <PageWrap>
      <BackBtn onClick={onBack} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <PageTitle title="Evaluate Student" subtitle={student ? `${student.name} · ${student.reg_number}` : ""} />
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: COLORS.muted }}>TOTAL SCORE</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: COLORS.gold }}>{total.toFixed(1)}/100</div>
        </div>
      </div>

      {submitErr && <div style={{ background: "#2A0F0F", border: "1px solid #5A2020", borderRadius: 10, padding: "12px 16px", color: COLORS.danger, fontSize: 13, marginBottom: 16 }}>⚠ {submitErr}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, maxWidth: 900 }}>

        {/* Criteria Inputs */}
        <Card>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 20, color: COLORS.gold }}>Evaluation Criteria</div>
          {(criteria || []).map(c => (
            <div key={c.id} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13, color: COLORS.white }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Max score: {c.weight} points ({c.weight}% weight)</div>
                </div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: COLORS.gold }}>
                  {scores[c.id] || 0}/{c.weight}
                </div>
              </div>
              <input
                type="number" min={0} max={c.weight} step={0.5}
                value={scores[c.id] || ""}
                onChange={e => setScores({ ...scores, [c.id]: e.target.value })}
                placeholder={`Enter score (0–${c.weight})`}
                style={inputStyle()}
              />
              {/* Mini bar */}
              <div style={{ height: 4, background: COLORS.navyLight, borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${c.weight > 0 ? Math.min((parseFloat(scores[c.id]) || 0) / c.weight, 1) * 100 : 0}%`, background: COLORS.gold, borderRadius: 2, transition: "width 0.2s" }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 8 }}>
            <Label>Overall Comments</Label>
            <textarea rows={4} value={comment} onChange={e => setComment(e.target.value)} placeholder="Provide overall feedback on the student's internship performance..." style={textareaStyle()} />
          </div>
        </Card>

        {/* Score Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 1, marginBottom: 8 }}>TOTAL SCORE</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: COLORS.gold }}>{total.toFixed(1)}</div>
            <div style={{ fontSize: 13, color: COLORS.muted }}>/100</div>
          </Card>

          <Card>
            <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 12 }}>Breakdown</div>
            {(criteria || []).map(c => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${COLORS.navyBorder}` }}>
                <span style={{ fontSize: 12, color: COLORS.muted }}>{c.name}</span>
                <span style={{ fontSize: 12, color: COLORS.white }}>{scores[c.id] || 0}/{c.weight}</span>
              </div>
            ))}
          </Card>

          <GoldBtn onClick={handleSubmit} disabled={!allFilled || submitting} style={{ width: "100%", justifyContent: "center" }}>
            {submitting ? "Submitting..." : "Submit Evaluation"}
          </GoldBtn>
          <div style={{ fontSize: 11, color: COLORS.muted, textAlign: "center" }}>This action cannot be undone once submitted.</div>
        </div>
      </div>
    </PageWrap>
  );
}
