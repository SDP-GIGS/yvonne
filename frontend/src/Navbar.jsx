function Navbar() {
  return (
      <header
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          background: "#111827", 
          color: "white",
          textAlign: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
        }}
      >
        
        
        <h1 style={{ marginBottom: "10px" }}>InSync ILES System</h1>
        <nav>
          <a href="#home" style={{ margin: "0 15px", color: "#60a5fa", textDecoration: "none" }}>Home</a>
          <a href="#features" style={{ margin: "0 15px", color: "#60a5fa", textDecoration: "none" }}>Features</a>
          <a href="#contact" style={{ margin: "0 15px", color: "#60a5fa", textDecoration: "none" }}>Contact</a>
        </nav>
      </header>
  );
}
export default Navbar;