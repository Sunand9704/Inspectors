import axios from 'axios';
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiBaseURL = "https://api2.brelis.in";
// const apiBaseURL = "http://localhost:8021";

export const api = axios.create({
  baseURL: envBaseUrl ? envBaseUrl : apiBaseURL,
  headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // For FormData requests, remove Content-Type header to let browser set it with boundary
  if (config.data instanceof FormData) {
    if (config.headers) {
      delete config.headers['Content-Type'];
    }
    console.log('FormData detected in request interceptor, removed Content-Type header');
    console.log('FormData entries:', Array.from(config.data.entries()).map(([key, value]) => {
      if (value instanceof File) {
        return [key, { name: value.name, size: value.size, type: value.type }];
      }
      return [key, value];
    }));
  }

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

