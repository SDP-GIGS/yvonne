import { useState, useEffect, useCallback } from 'react';
import { studentAPI, supervisorAPI, adminAPI, authAPI } from '../api/apiService';

// Generic fetch hook - NO silent mock fallback, surfaces real errors
const useFetchData = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        'Failed to load data.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch };
};

// ── Student ───────────────────────────────────────────────────────────────────
// Returns the logged-in user's profile from /api/users/users/me/
export const useStudentDashboard = () => useFetchData(authAPI.getProfile);

// Returns all logs for the logged-in student from /api/logs/
export const useStudentLogs = () => useFetchData(studentAPI.getLogs);

// Returns the student's placement from /api/placements/
export const useStudentPlacement = () => useFetchData(studentAPI.getPlacements);

// Returns the student's evaluations from /api/evaluations/
export const useStudentEvaluations = () => useFetchData(studentAPI.getEvaluations);

// ── Admin ─────────────────────────────────────────────────────────────────────
// Returns all users from /api/users/users/
export const useAdminStats = () => useFetchData(adminAPI.getUsers);

// Returns all logs from /api/logs/
export const useAdminLogs = () => useFetchData(adminAPI.getLogs);

// Returns all placements from /api/placements/
export const useAdminPlacements = () => useFetchData(adminAPI.getPlacements);

// Returns supervisor applications from /api/users/supervisor-applications/
export const useAdminSupervisorApps = () => useFetchData(adminAPI.getSupervisorApplications);

// ── Supervisor (Workplace + Academic) ─────────────────────────────────────────
// Returns the supervisor's profile
export const useWorkplaceDashboard = () => useFetchData(authAPI.getProfile);
export const useAcaDashboard = () => useFetchData(authAPI.getProfile);

// Returns logs assigned to the supervisor (filtered server-side by role)
export const useReviewQueue = () => useFetchData(supervisorAPI.getReviewQueue);

// Returns students (users list, filtered server-side)
export const useWPStudents = () => useFetchData(supervisorAPI.getStudents);
export const useAcaStudents = () => useFetchData(supervisorAPI.getStudents);

// Returns evaluations
export const useAcaEvaluations = () => useFetchData(studentAPI.getEvaluations);

// ── Aliases and placeholders ──────────────────────────────────────────────────
export const useWPDashboard = useWorkplaceDashboard;
export const useAcaStudent = () => ({ data: null, loading: false, error: null, refetch: () => {} });
export const useAcaStudentLogs = () => ({ data: [], loading: false, error: null, refetch: () => {} });
export const useEvalCriteria = () => ({ data: [], loading: false, error: null, refetch: () => {} });
export const useSubmitEvaluation = () => ({ mutate: () => {}, isLoading: false });
export const useWPStudent = () => ({ data: null, loading: false, error: null, refetch: () => {} });
export const useWPStudentLogs = () => ({ data: [], loading: false, error: null, refetch: () => {} });

export const useWPLog = (logId) => useFetchData(() => supervisorAPI.getLog(logId));

export const useReviewLog = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError  ] = useState(null);

  const mutate = async (logId, reviewData) => {
    setLoading(true);
    setError(null);
    try {
      await supervisorAPI.reviewLog(logId, reviewData);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit review.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};