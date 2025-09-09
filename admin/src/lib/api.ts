import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://inspectors-backend-e1rq.onrender.com');

export const api = axios.create({
  baseURL: apiBaseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  // add start time
  (config as any).metadata = { startTime: (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now() };
  return config;
});

api.interceptors.response.use(
  (response) => {
    const start = (response.config as any).metadata?.startTime as number | undefined;
    const end = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const duration = typeof start === 'number' ? (end - start) : undefined;
    if (typeof duration === 'number') {
      // eslint-disable-next-line no-console
      console.log(`Frontend request (admin) to ${response.config.url} took ${duration.toFixed(1)} ms`);
    }
    return response;
  },
  (error) => {
    const cfg = error.config || {};
    const start = (cfg as any).metadata?.startTime as number | undefined;
    const end = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const duration = typeof start === 'number' ? (end - start) : undefined;
    if (typeof duration === 'number') {
      // eslint-disable-next-line no-console
      console.log(`Frontend request (admin) to ${cfg.url} failed after ${duration?.toFixed(1)} ms`);
    }
    return Promise.reject(error);
  }
);

