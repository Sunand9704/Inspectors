import axios from 'axios';
const envBaseUrl = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;


// Use frontend env var if provided; otherwise default to local backend that points to your new DB
const renderurl ="https://inspectors.onrender.com";
const local = "http://localhost:8000";

const apiBaseURL = false ? local : renderurl;


export const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Debug logging via interceptors
apiClient.interceptors.request.use((config) => {
  // eslint-disable-next-line no-console
  console.log('[API][REQUEST]', {
    method: config.method,
    url: `${config.baseURL || ''}${config.url}`,
    params: config.params,
    data: config.data,
  });
  // performance timing start
  (config as any).metadata = { startTime: (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now() };
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const start = (response.config as any).metadata?.startTime as number | undefined;
    const end = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const duration = typeof start === 'number' ? (end - start) : undefined;
    if (typeof duration === 'number') {
      // eslint-disable-next-line no-console
      console.log(`Frontend request to ${response.config.url} took ${duration.toFixed(1)} ms`);
    }
    // eslint-disable-next-line no-console
    console.log('[API][RESPONSE]', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    const cfg = error.config || {};
    const start = (cfg as any).metadata?.startTime as number | undefined;
    const end = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const duration = typeof start === 'number' ? (end - start) : undefined;
    if (typeof duration === 'number') {
      // eslint-disable-next-line no-console
      console.log(`Frontend request to ${cfg.url} failed after ${duration.toFixed(1)} ms`);
    }
    // eslint-disable-next-line no-console
    console.error('[API][ERROR]', {
      url: error.config?.url,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export type SectionDto = {
  _id: string;
  title: string;
  bodyText?: string;
  images?: string[];
  coverPhoto?: string;
  language?: string;
  pageNumber?: number;
  sectionId?: string;
};

export type PageDto = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  language?: string;
  sections?: SectionDto[];
  category?: string;
  isActive?: boolean;
};

export async function getPageWithSections(pageName: string, sectionName?: string, lang?: string): Promise<PageDto> {
  // Get language from localStorage if not provided
  const language = lang || localStorage.getItem('preferredLanguage') || 'en';
  const params = { lang: language };

  // If a section name is provided, use the search endpoint which supports server-side section filtering
  if (sectionName) {
    const searchUrl = `/api/pages/search/${encodeURIComponent(pageName)}/${encodeURIComponent(sectionName)}`;
    const { data } = await apiClient.get(searchUrl, { params });
    return data.data as PageDto;
  }

  // Otherwise try exact slug match first, then fallback to search
  try {
    const slugUrl = `/api/pages/slug/${encodeURIComponent(pageName)}`;
    const { data } = await apiClient.get(slugUrl, { params });
    return data.data as PageDto;
  } catch (err: any) {
    if (err?.response?.status !== 404) throw err;
    const searchUrl = `/api/pages/search/${encodeURIComponent(pageName)}`;
    const { data } = await apiClient.get(searchUrl, { params });
    return data.data as PageDto;
  }
}

export async function listPages(params?: {
  page?: number;
  limit?: number;
  lang?: string;
  populate?: boolean | string;
  isActive?: boolean | string;
  category?: string;
  search?: string;
}): Promise<PageDto[]> {
  const query: Record<string, any> = {};
  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;
  if (params?.lang) query.lang = params.lang;
  if (typeof params?.populate !== 'undefined') query.populate = String(params.populate);
  if (typeof params?.isActive !== 'undefined') query.isActive = String(params.isActive);
  if (params?.category) query.category = params.category;
  if (params?.search) query.search = params.search;

  const { data } = await apiClient.get('/api/pages', { params: query });
  return (data?.data || []) as PageDto[];
}

export type JobApplicationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  experience: string;
  coverLetter: string;
};

export async function submitJobApplication(applicationData: JobApplicationData, resumeFile: File): Promise<any> {
  const formData = new FormData();
  
  // Append all form data
  Object.entries(applicationData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Append resume file
  formData.append('resume', resumeFile);
  
  const { data } = await apiClient.post('/api/careers/apply', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return data;
}


