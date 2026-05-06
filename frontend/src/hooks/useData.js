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

export const useAcaStudent = (studentId) =>
  useFetchData(() => supervisorAPI.getStudent(studentId));

export const useAcaStudentLogs = (studentId) =>
  useFetchData(() => api.get(`/api/logs/?student=${studentId}`));

export const useEvalCriteria = () => ({
  data: [
    { id: 'organization_score', name: 'Organisation & Conduct',  weight: 40 },
    { id: 'logbook_score',      name: 'Logbook Quality',         weight: 30 },
    { id: 'final_report_score', name: 'Final Report',            weight: 30 },
  ],
  loading: false,
  error: null,
  refetch: () => {},
});

export const useSubmitEvaluation = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError  ] = useState(null);

  const mutate = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      // Map the frontend payload to the backend's field names
      const backendPayload = {
        placement:            payload.placement_id,
        organization_score:   payload.scores.find(s => s.criterion_id === 'organization_score')?.score ?? 0,
        logbook_score:        payload.scores.find(s => s.criterion_id === 'logbook_score')?.score ?? 0,
        final_report_score:   payload.scores.find(s => s.criterion_id === 'final_report_score')?.score ?? 0,
        comments:             payload.comment,
      };
      await supervisorAPI.submitEvaluation(backendPayload);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit evaluation.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

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