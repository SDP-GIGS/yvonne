import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardShell from "./components/DashboardShell";
import PublicLayout from "./components/PublicLayout";


import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/login/SignUpPage";

// Student Dashboards
import StudentDashboard from "./pages/StudentIntern/Studentdashboard";
import StudentLogbook from "./pages/StudentIntern/Studentlogbook";
import StudentPlacement from "./pages/StudentIntern/Studentplacement";
import StudentEvaluation from "./pages/StudentIntern/Studentevaluation";
import StudentProfile from "./pages/StudentIntern/Studentprofile";

// Admin Dashboards
import { AdminDashboardPage } from "./pages/Administrator/Admindashboard";
import AdminUsers from "./pages/Administrator/AdminUsers";
import AdminPlacements from "./pages/Administrator/Adminplacements";
import AdminLogs from "./pages/Administrator/Adminlogs";
import AdminCriteria from "./pages/Administrator/Admincriteria";
import AdminReports from "./pages/Administrator/Adminreports";
import AdminProfile from "./pages/Administrator/Adminprofile";

// Workplace Supervisor Dashboards
import { WorkplaceSupervisorDashboard } from "./pages/WorkplaceSupervisor/WorkplaceSupevisorDashboard";
import WSStudents from "./pages/WorkplaceSupervisor/StudentList";
import WSReviewQueue from "./pages/WorkplaceSupervisor/ReviewQueue";
import WSProfile from "./pages/WorkplaceSupervisor/WorkplaceSupervisorProfile";

// Academic Supervisor Dashboards
import { AcaDashboardPage } from "./pages/AcademicSupervisor/AcaDashboard";
import AcaStudents from "./pages/AcademicSupervisor/AcaStudentsPage";
import AcaEvaluations from "./pages/AcademicSupervisor/AcaEvaluationHistoryPage";
import AcaProfile from "./pages/AcademicSupervisor/AcaProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public Routes ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          {/* ── Student Portal (RBAC: STUDENT only) ── */}
          <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
            <Route path="/student" element={<DashboardShell role="STUDENT" />}>
              <Route index element={<StudentDashboard />} />
              <Route path="logbook" element={<StudentLogbook />} />
              <Route path="placement" element={<StudentPlacement />} />
              <Route path="evaluation" element={<StudentEvaluation />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
          </Route>

          {/* ── Admin Portal (RBAC: ADMIN only) ── */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<DashboardShell role="ADMIN" />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="placements" element={<AdminPlacements />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="criteria" element={<AdminCriteria />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

          {/* ── Workplace Supervisor Portal (RBAC: WORK_SUPERVISOR only) ── */}
          <Route element={<ProtectedRoute allowedRoles={["WORK_SUPERVISOR"]} />}>
            <Route path="/workplace" element={<DashboardShell role="WORK_SUPERVISOR" />}>
              <Route index element={<WorkplaceSupervisorDashboard />} />
              <Route path="students" element={<WSStudents />} />
              <Route path="review" element={<WSReviewQueue />} />
              <Route path="profile" element={<WSProfile />} />
            </Route>
          </Route>

          {/* ── Academic Supervisor Portal (RBAC: ACADEMIC_SUPERVISOR only) ── */}
          <Route element={<ProtectedRoute allowedRoles={["ACADEMIC_SUPERVISOR"]} />}>
            <Route path="/academic" element={<DashboardShell role="ACADEMIC_SUPERVISOR" />}>
              <Route index element={<AcaDashboardPage />} />
              <Route path="students" element={<AcaStudents />} />
              <Route path="evaluations" element={<AcaEvaluations />} />
              <Route path="profile" element={<AcaProfile />} />
            </Route>
          </Route>

          {/* Legacy redirects */}
          <Route path="/student-dashboard" element={<Navigate to="/student" replace />} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/workplace-dashboard" element={<Navigate to="/workplace" replace />} />
          <Route path="/academic-dashboard" element={<Navigate to="/academic" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
