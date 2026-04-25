import { useState, useEffect } from 'react';
import { studentAPI, supervisorAPI, adminAPI } from '../api/apiService';

const useFetchData = (apiCall, mockData) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        console.error("API Error, using mock data:", err);
        setData(mockData);
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

// Student Hooks
export const useStudentDashboard = () => useFetchData(studentAPI.getDashboard, {
  name: "John Doe",
  company: "Tech Solutions Ltd",
  weeksCompleted: 8,
  totalWeeks: 12,
  overallScore: 85,
  grade: "A",
  logs: [
    { id: 1, weekNumber: 8, activities: "Developed UI components", hoursWorked: 40, status: "ACCEPTED" },
    { id: 2, weekNumber: 7, activities: "API Integration", hoursWorked: 38, status: "ACCEPTED" },
  ],
  workplaceScore: 90,
  academicScore: 80,
  logQualityScore: 85,
  students: [{ id: 1, name: "John Doe" }], // For the other dashboard version
  placements: [{ studentId: 1, company: "Tech Solutions Ltd", dept: "IT", wpSup: "Jane Smith", status: "Active" }]
});

// Academic Supervisor Hooks
export const useAcaDashboard = () => useFetchData(supervisorAPI.getDashboard, {
  supervisor_name: "Dr. Robert King",
  total_students: 15,
  pending_evaluations: 3,
  completed_evaluations: 12,
  average_score: 78,
  pending_students: [
    { id: 101, name: "Alice Nkemba", reg_number: "2023/BIT/001" },
    { id: 102, name: "Bob Musoke", reg_number: "2023/BIT/002" },
  ],
  score_distribution: [
    { grade: "A", range: "80-100", count: 5 },
    { grade: "B", range: "70-79", count: 7 },
  ]
});

// Workplace Supervisor Hooks
export const useWorkplaceDashboard = () => useFetchData(supervisorAPI.getDashboard, {
  supervisor_name: "Jane Smith",
  company_name: "Tech Solutions Ltd",
  total_students: 4,
  pending_reviews: 2,
  approved_this_week: 1,
  total_reviewed: 45,
  review_queue: [
    { id: 1, student_name: "John Doe", week_number: 8, submitted_on: "2026-04-20" },
    { id: 2, student_name: "Mary Jane", week_number: 7, submitted_on: "2026-04-19" },
  ],
  students: [
    { id: 1, name: "John Doe", reg_number: "BIT/001", department: "IT", placement_status: "Active" }
  ]
});

// Admin Hooks
export const useAdminStats = () => useFetchData(adminAPI.getStats, {
  totalStudents: 450,
  activePlacements: 380,
  pendingPlacements: 70,
  systemHealth: "Good",
  roleDistribution: [
    { role: "Students", count: 450 },
    { role: "Academic Supervisors", count: 25 },
    { role: "Workplace Supervisors", count: 120 },
  ]
});

// Required by some pages
export const useAcaStudents = () => ({ data: [], loading: false, error: null });
export const useAcaStudent = () => ({ data: {}, loading: false, error: null });
export const useAcaStudentLogs = () => ({ data: [], loading: false, error: null });
export const useAcaEvaluations = () => ({ data: [], loading: false, error: null });
export const useEvalCriteria = () => ({ data: [], loading: false, error: null });
export const useSubmitEvaluation = () => ({ mutate: () => {}, isLoading: false });

// Workplace Supervisor placeholders/aliases
export const useWPDashboard = useWorkplaceDashboard;
export const useWPStudents = () => ({ data: [], loading: false, error: null });
export const useWPStudent = () => ({ data: {}, loading: false, error: null });
export const useWPStudentLogs = () => ({ data: [], loading: false, error: null });
export const useReviewQueue = () => ({ data: [], loading: false, error: null });
export const useWPLog = () => ({ data: {}, loading: false, error: null });
export const useReviewLog = () => ({ mutate: () => {}, isLoading: false });
