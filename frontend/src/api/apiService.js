import axios from 'axios';

// Single source of truth for base URL
// Uses localhost (not 127.0.0.1) to match CORS_ALLOWED_ORIGIN_REGEXES on backend
const baseURL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : 'https://yvonne.tagooledavid.com';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Automatically attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem('authTokens');
    if (raw) {
      try {
        const { access } = JSON.parse(raw);
        config.headers.Authorization = `Bearer ${access}`;
      } catch (_) {}
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login:          (credentials) => api.post('/api/token/login/', credentials),
  register:       (userData)    => api.post('/api/users/users/', userData),
  getProfile:     ()            => api.get('/api/users/users/me/'),
  logout:         (refreshToken)=> api.post('/api/token/logout/', { refresh: refreshToken }),
  changePassword: (data)        => api.post('/api/users/users/change_password/', data),
};

// ── Student ───────────────────────────────────────────────────────────────────
export const studentAPI = {
  getDashboard:   ()         => api.get('/api/users/users/me/'),
  getLogs:        ()         => api.get('/api/logs/'),
  submitLog:      (data)     => api.post('/api/logs/', data),
  updateLog:      (id, data) => api.patch(`/api/logs/${id}/`, data),
  deleteLog:      (id)       => api.delete(`/api/logs/${id}/`),
  getPlacements:  ()         => api.get('/api/placements/'),
  getEvaluations: ()         => api.get('/api/evaluations/'),
};

// ── Supervisor (Workplace + Academic) ─────────────────────────────────────────
export const supervisorAPI = {
  getDashboard:     ()                  => api.get('/api/users/users/me/'),
  getStudents:      ()                  => api.get('/api/users/users/'),
  getReviewQueue:   ()                  => api.get('/api/logs/'),
  reviewLog:        (logId, reviewData) => api.post('/api/reviews/', { log: logId, ...reviewData }),
  submitEvaluation: (data)              => api.post('/api/evaluations/', data),
};

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getUsers:                  ()     => api.get('/api/users/users/'),
  getLogs:                   ()     => api.get('/api/logs/'),
  getPlacements:             ()     => api.get('/api/placements/'),
  assignPlacement:           (data) => api.post('/api/placements/', data),
  getSupervisorApplications: ()     => api.get('/api/users/supervisor-applications/'),
  approveApplication:        (id)   => api.post(`/api/users/supervisor-applications/${id}/approve/`),
  rejectApplication:         (id)   => api.post(`/api/users/supervisor-applications/${id}/reject/`),
};

export default api;
