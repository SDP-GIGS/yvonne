import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useAuth();


  return (
    <header
      style={{
        fontFamily: "Inter, sans-serif",
        padding: "15px 40px",
        background: "rgba(17, 24, 39, 0.8)",
        backdropFilter: "blur(10px)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0, background: "linear-gradient(to right, #60a5fa, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>InSync ILES</Link>
      </h1>
      <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/" style={{ color: "#e5e7eb", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Home</Link>
        {user ? (
          <>
            <Link to={getDashboardLink()} style={{ color: "#e5e7eb", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Dashboard</Link>
            <button 
              onClick={logoutUser}
              style={{ background: "none", border: "1px solid #334155", color: "#e5e7eb", padding: "6px 15px", borderRadius: "8px", cursor: "pointer", fontWeight: "500" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#e5e7eb", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Login</Link>
            <Link to="/signup" style={{ color: "#e5e7eb", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
