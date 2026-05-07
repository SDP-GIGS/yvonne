import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, ShieldCheck, Briefcase, BookOpen, ArrowRight } from "lucide-react";

// Role → portal config. Only the user's own portal is shown when logged in.
const PORTAL_CONFIG = {
  STUDENT: {
    icon: GraduationCap,
    label: "Student Portal",
    description: "Submit weekly logs, track your placement, and view evaluations.",
    route: "/student",
    accent: "#3b82f6",
  },
  ADMIN: {
    icon: ShieldCheck,
    label: "Admin Portal",
    description: "Manage users, assign placements, review logs, and generate reports.",
    route: "/admin",
    accent: "#f59e0b",
  },
  WORK_SUPERVISOR: {
    icon: Briefcase,
    label: "Workplace Supervisor Portal",
    description: "Review intern logs and submit workplace evaluations.",
    route: "/workplace",
    accent: "#10b981",
  },
  ACADEMIC_SUPERVISOR: {
    icon: BookOpen,
    label: "Academic Supervisor Portal",
    description: "Monitor student progress and submit academic evaluations.",
    route: "/academic",
    accent: "#8b5cf6",
  },
};

// Public teasers — shown when NOT logged in (no links, just awareness)
const ALL_PORTALS = Object.values(PORTAL_CONFIG);

export default function PortalAccess() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // Guest view — show all portals as info cards, no access links
    return (
      <section
        id="portal-access"
        style={{
          background: "linear-gradient(135deg, #0b1120 0%, #0f172a 100%)",
          padding: "80px 40px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#f59e0b", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
              Role-Based Access
            </p>
            <h2 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
              One system, four portals
            </h2>
            <p style={{ color: "#94a3b8", marginTop: "12px", fontSize: "1rem" }}>
              Sign up to access the portal that matches your role.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "24px" }}>
            {ALL_PORTALS.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.label}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "28px 24px",
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${portal.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={22} style={{ color: portal.accent }} />
                  </div>
                  <h3 style={{ color: "#ffffff", fontWeight: 600, fontSize: "1rem", margin: "0 0 8px" }}>{portal.label}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{portal.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Authenticated view — show only the user's own portal with a Go button
  const myPortal = PORTAL_CONFIG[user.role];
  if (!myPortal) return null;
  const Icon = myPortal.icon;

  
  return (
    <section
      id="portal-access"
      style={{
        background: "linear-gradient(135deg, #0b1120 0%, #0f172a 100%)",
        padding: "80px 40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#f59e0b", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
          Your Access
        </p>
        <h2 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 700, margin: "0 0 8px" }}>
          Welcome back, {user.first_name || "there"}!
        </h2>
        <p style={{ color: "#94a3b8", marginTop: "8px", marginBottom: "40px", fontSize: "1rem" }}>
          You are logged in as <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{user.email}</span>.
          Your portal is ready.
        </p>

        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${myPortal.accent}40`,
            borderRadius: "20px",
            padding: "36px",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `${myPortal.accent}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={28} style={{ color: myPortal.accent }} />
          </div>
          <div>
            <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.25rem", margin: "0 0 8px" }}>{myPortal.label}</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>{myPortal.description}</p>
          </div>
          <button
            
            onClick={() => navigate(myPortal.route)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: myPortal.accent,
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            Go to my portal <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
