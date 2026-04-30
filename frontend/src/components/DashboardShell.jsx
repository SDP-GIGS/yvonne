import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStudentDashboard, useAdminStats, useWorkplaceDashboard, useAcaDashboard } from '../hooks/useData';
import {
  LayoutDashboard,
  FileText,
  Users,
  Building2,
  ClipboardCheck,
  UserCircle,
  LogOut,
  Menu,
  X,
  FileSearch,
  BarChart3,
  Settings
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
        ? 'bg-amber-500 text-navy font-semibold shadow-lg shadow-amber-500/20'
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
      }`
    }
  >
    <Icon size={18} className="transition-transform group-hover:scale-110" />
    <span className="text-sm">{children}</span>
  </NavLink>
);

const roleLinks = {
  STUDENT: [
    { to: '', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: 'logbook', label: 'Logbook', icon: FileText },
    { to: 'placement', label: 'Placement', icon: Building2 },
    { to: 'evaluation', label: 'Evaluation', icon: ClipboardCheck },
    { to: 'profile', label: 'Profile', icon: UserCircle },
  ],
  ADMIN: [
    { to: '', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: 'users', label: 'Manage Users', icon: Users },
    { to: 'placements', label: 'Placements', icon: Building2 },
    { to: 'logs', label: 'All Logs', icon: FileSearch },
    { to: 'criteria', label: 'Criteria', icon: Settings },
    { to: 'reports', label: 'Reports', icon: BarChart3 },
    { to: 'profile', label: 'Profile', icon: UserCircle },
  ],
  WORK_SUPERVISOR: [
    { to: '', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: 'students', label: 'My Students', icon: Users },
    { to: 'review', label: 'Review Queue', icon: ClipboardCheck },
    { to: 'profile', label: 'Profile', icon: UserCircle },
  ],
  ACADEMIC_SUPERVISOR: [
    { to: '', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: 'students', label: 'My Students', icon: Users },
    { to: 'evaluations', label: 'Evaluations', icon: ClipboardCheck },
    { to: 'profile', label: 'Profile', icon: UserCircle },
  ],
};


const roleHooks = {
  STUDENT: useStudentDashboard,
  ADMIN: useAdminStats,
  WORK_SUPERVISOR: useWorkplaceDashboard,
  ACADEMIC_SUPERVISOR: useAcaDashboard,
};

export default function DashboardShell({ role }) {
  const { logoutUser, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const links = roleLinks[role] || [];
  const navigate = useNavigate();

  // Fetch data based on role
  const { data, loading, error } = (roleHooks[role] || (() => ({ data: null, loading: false })))();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const contextValue = {
    data,
    setData: () => { }, // Placeholder
    studentId: user?.id || 1,
    loading,
    error
  };

  return (
    <div className="flex min-h-screen bg-[#0B1120] text-slate-200">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-amber-500 text-navy rounded-full shadow-2xl"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0F172A] border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-8 px-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              InSync ILES
            </h1>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto">
            <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Current Portal
            </div>
            {links.map((link) => (
              <SidebarLink key={link.to} to={link.to} icon={link.icon} end={link.end}>
                {link.label}
              </SidebarLink>
            ))}

            <div className="mt-8 mb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Other Portals
            </div>
            {role !== 'STUDENT' && <SidebarLink to="/student" icon={Users} end={false}>Student Portal</SidebarLink>}
            {role !== 'ADMIN' && <SidebarLink to="/admin" icon={Building2} end={false}>Admin Portal</SidebarLink>}
            {role !== 'WORK_SUPERVISOR' && <SidebarLink to="/workplace" icon={ClipboardCheck} end={false}>Workplace Portal</SidebarLink>}
            {role !== 'ACADEMIC_SUPERVISOR' && <SidebarLink to="/academic" icon={FileText} end={false}>Academic Portal</SidebarLink>}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3 px-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || role?.toLowerCase() || 'portal'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-colors group"
            >
              <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <Outlet context={contextValue} />
          )}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
