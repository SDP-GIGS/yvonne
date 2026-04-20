import { Link } from "react-router-dom";

function Navbar() {
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
        InSync ILES 
      </h1>
            <nav style={{ display: "flex", gap: "25px" }}>
        <Link to="/" style={{ color: "#e5e7eb", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Home</Link>
        <Link to="/login" style={{ color: "#e5e7eb", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Login</Link>
        <Link to="/signup" style={{ color: "#e5e7eb", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Sign Up</Link>
      </nav>
    </header>
  );
}
export default Navbar;
