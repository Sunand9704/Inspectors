import axios from 'axios';
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;


// Use frontend env var if provided; otherwise default to local backend that points to your new DB
const renderurl = "https://api2.brelis.in";
const local = "http://localhost:8000";

// For development, use localhost. Change to true to use Render.com
const USE_LOCAL = true; // Set to false for production
const apiBaseURL = true ? renderurl : local;

export const apiClient = axios.create({
  baseURL: envBaseUrl ? envBaseUrl : apiBaseURL,
  withCredentials: false,
  // Don't set default Content-Type - let axios set it based on data type
});


// Debug logging via interceptors
apiClient.interceptors.request.use((config) => {
  const isFormData = config.data instanceof FormData;
  
  // For FormData, axios will automatically set Content-Type with boundary
  // For other requests, set Content-Type to application/json
  if (!isFormData) {
    if (!config.headers) {
      config.headers = {} as any;
    }
    // Only set Content-Type if it's not already set and data exists
    if (config.data && !config.headers['Content-Type'] && !config.headers['content-type']) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  
  // Log request info for debugging
  if (isFormData) {
    const formDataEntries: string[] = [];
    try {
      for (const [key, value] of (config.data as FormData).entries()) {
        if (value instanceof File) {
          formDataEntries.push(`${key}: File(${value.name}, ${(value as File).size} bytes, ${(value as File).type})`);
        } else {
          formDataEntries.push(`${key}: ${String(value).substring(0, 50)}`);
        }
      }
    } catch (e) {
      formDataEntries.push('(could not iterate FormData)');
    }
    // eslint-disable-next-line no-console
    console.log('[API][REQUEST] FormData Upload', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL || ''}${config.url}`,
      entries: formDataEntries,
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('[API][REQUEST]', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL || ''}${config.url}`,
      params: config.params,
    });
  }
  
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
  // Create FormData object
  const formData = new FormData();
  
  // Append all form fields explicitly (important for multer on backend)
  formData.append('firstName', applicationData.firstName);
  formData.append('lastName', applicationData.lastName);
  formData.append('email', applicationData.email);
  formData.append('phone', applicationData.phone);
  formData.append('position', applicationData.position);
  formData.append('department', applicationData.department);
  formData.append('experience', applicationData.experience);
  formData.append('coverLetter', applicationData.coverLetter);
  
  // Append resume file - multer expects field name 'resume'
  formData.append('resume', resumeFile, resumeFile.name);
  
  // Create an AbortController for timeout handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 30000); // 30 second timeout - fail fast
  
  try {
    console.log('[submitJobApplication] Sending request to:', `${apiClient.defaults.baseURL}/api/careers/apply`);
    
    // Axios automatically handles FormData and sets correct Content-Type
    // with multipart/form-data and boundary
    const response = await apiClient.post('/api/careers/apply', formData, {
      signal: controller.signal,
      timeout: 30000, // 30 second timeout for file uploads
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      },
    });
    
    clearTimeout(timeoutId);
    console.log('[submitJobApplication] Success:', response.data);
    return response.data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    // Handle different error types
    let errorMessage = 'Failed to submit application. Please try again.';
    
    if (error.code === 'ECONNABORTED' || error.message === 'canceled' || error.name === 'AbortError') {
      errorMessage = 'Request timed out. The server is taking too long to respond. Please check your connection and try again.';
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      errorMessage = 'Network error. Please check your internet connection and try again.';
    } else if (error.response?.status === 400) {
      errorMessage = error.response?.data?.message || 'Invalid data. Please check all fields and try again.';
    } else if (error.response?.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    // Enhanced error logging for debugging
    const errorInfo = {
      message: error.message,
      code: error.code,
      name: error.name,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
      url: error.config?.url,
    };
    
    console.error('[submitJobApplication] Error:', errorInfo);
    console.error('[submitJobApplication] Error message for user:', errorMessage);
    
    // Create a user-friendly error
    const userError = new Error(errorMessage);
    (userError as any).response = error.response;
    (userError as any).code = error.code;
    throw userError;
  }
}


