import axios from 'axios';

//our own api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach auth token as header to reuest --> if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('studyzen_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle token expiration or 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if backend didnt respond at all --> error.response==undefined so handle it first
    if (error.response && error.response.status === 401) {
      // If unauthorized and not already on auth page, can clear stale tokens
      const isAuthRoute =
        window.location.pathname === '/login' ||
        window.location.pathname === '/register';
      if (!isAuthRoute) {  //clean up JWT token if its not lgin ot register
        localStorage.removeItem('studyzen_token');
        localStorage.removeItem('studyzen_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

