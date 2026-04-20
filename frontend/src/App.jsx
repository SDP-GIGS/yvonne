import Navbar from "./Navbar";
import Footer from "./Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/login/SignUpPage";
import { StudentDashboard } from "./pages/login/Studentdashboard";
import { AdminDashboard } from "./pages/login/Admindashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
