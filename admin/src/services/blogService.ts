import { api } from '@/lib/api';

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  tags: string[];
  featuredImage: string;
  images: Array<{
    url: string;
    alt?: string;
    caption?: string;
    order: number;
  }>;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  metaDescription?: string;
  readingTime?: number;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogData {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featuredImage: string;
  images?: Array<{
    url: string;
    alt?: string;
    caption?: string;
    order?: number;
  }>;
  isPublished?: boolean;
  isFeatured?: boolean;
  metaDescription?: string;
  slug?: string;
  pdfUrl?: string;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
  // No _id required here since it's passed separately to updateBlog function
}

export interface BlogListResponse {
  success: boolean;
  data: {
    blogs: Blog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface BlogResponse {
  success: boolean;
  data: Blog;
  message?: string;
}

class BlogService {
  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      const url = `/api/blogs${endpoint}`;
      const method = options.method || 'GET';
      
      // Handle FormData differently from JSON
      const isFormData = options.body instanceof FormData;
      const config: any = {
        method,
        url,
        params: options.params,
      };
      
      if (isFormData) {
        config.data = options.body;
        // Don't set Content-Type for FormData - let axios set it with boundary
        config.headers = options.headers || {};
      } else {
        config.data = options.body;
        config.headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        };
      }
      
      const { data } = await api.request(config);
      return data as T;
    } catch (error: any) {
      console.error('Blog service error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || `HTTP error! status: ${error?.response?.status}`;
      throw new Error(errorMessage);
    }
  }

  // Get all blogs with pagination and filtering
  async getBlogs(params: {
    page?: number;
    limit?: number;
    featured?: boolean;
    tag?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    includeUnpublished?: boolean;
  } = {}): Promise<BlogListResponse> {
    const queryParams: any = {};
    
    if (params.page) queryParams.page = params.page.toString();
    if (params.limit) queryParams.limit = params.limit.toString();
    if (params.featured !== undefined) queryParams.featured = params.featured.toString();
    if (params.tag) queryParams.tag = params.tag;
    if (params.search) queryParams.search = params.search;
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
    if (params.includeUnpublished) queryParams.includeUnpublished = 'true';

    return this.request<BlogListResponse>('', {
      params: queryParams,
    });
  }

  // Get single blog by ID
  async getBlogById(id: string): Promise<BlogResponse> {
    return this.request<BlogResponse>(`/${id}`);
  }

  // Get featured blogs
  async getFeaturedBlogs(limit: number = 5): Promise<BlogResponse> {
    return this.request<BlogResponse>('/featured', {
      params: { limit: limit.toString() },
    });
  }

  // Get blogs by tag
  async getBlogsByTag(tag: string, page: number = 1, limit: number = 10): Promise<BlogListResponse> {
    return this.request<BlogListResponse>(`/tag/${encodeURIComponent(tag)}`, {
      params: { page: page.toString(), limit: limit.toString() },
    });
  }

  // Search blogs
  async searchBlogs(query: string, page: number = 1, limit: number = 10): Promise<BlogListResponse> {
    return this.request<BlogListResponse>('/search', {
      params: { q: query, page: page.toString(), limit: limit.toString() },
    });
  }

  // Get all tags
  async getAllTags(): Promise<{ success: boolean; data: string[] }> {
    return this.request<{ success: boolean; data: string[] }>('/tags');
  }

  // Create new blog
  async createBlog(blogData: CreateBlogData, featuredImageFile?: File, pdfFile?: File): Promise<BlogResponse> {
    console.log('createBlog called with:', {
      hasFeaturedImage: !!featuredImageFile,
      hasPdf: !!pdfFile,
      pdfFileName: pdfFile?.name,
      pdfFileSize: pdfFile?.size
    });

    if (featuredImageFile || pdfFile) {
      const formData = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'tags' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });
      if (featuredImageFile) {
        console.log('Appending featuredImageFile:', featuredImageFile.name, featuredImageFile.size);
      formData.append('featuredImageFile', featuredImageFile);
      }
      if (pdfFile) {
        console.log('Appending pdfFile:', pdfFile.name, pdfFile.size, pdfFile.type);
        formData.append('pdfFile', pdfFile);
      }
      
      // Log FormData contents (for debugging)
      console.log('FormData prepared with files');
      
      return this.request<BlogResponse>('', {
        method: 'POST',
        body: formData,
        headers: {} // Remove Content-Type header to let browser set it with boundary for FormData
      });
    } else {
      return this.request<BlogResponse>('', {
        method: 'POST',
        body: blogData,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Update blog
  async updateBlog(id: string, blogData: Partial<CreateBlogData>, featuredImageFile?: File, pdfFile?: File): Promise<BlogResponse> {
    console.log('updateBlog called with:', {
      id,
      hasFeaturedImage: !!featuredImageFile,
      hasPdf: !!pdfFile,
      pdfFileName: pdfFile?.name,
      pdfFileSize: pdfFile?.size,
      pdfFileType: pdfFile?.type
    });

    if (featuredImageFile || pdfFile) {
      const formData = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'images' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (key === 'tags' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as string);
          }
        }
      });
      if (featuredImageFile) {
        console.log('Appending featuredImageFile:', featuredImageFile.name, featuredImageFile.size);
      formData.append('featuredImageFile', featuredImageFile);
      }
      if (pdfFile) {
        console.log('Appending pdfFile:', pdfFile.name, pdfFile.size, pdfFile.type);
        formData.append('pdfFile', pdfFile);
      }
      
      // Log FormData contents (for debugging)
      console.log('FormData prepared with files for update');
      
      return this.request<BlogResponse>(`/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {} // Remove Content-Type header to let browser set it with boundary for FormData
      });
    } else {
      return this.request<BlogResponse>(`/${id}`, {
        method: 'PUT',
        body: blogData,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Delete blog
  async deleteBlog(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/${id}`, {
      method: 'DELETE',
    });
  }

  // Get all blogs for admin (including unpublished)
  async getAllBlogsForAdmin(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'all' | 'published' | 'draft';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<BlogListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.status && params.status !== 'all') {
      searchParams.append('isPublished', params.status === 'published' ? 'true' : 'false');
    }
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

    const queryParams: any = {};
    if (params.page) queryParams.page = params.page.toString();
    if (params.limit) queryParams.limit = params.limit.toString();
    if (params.search) queryParams.search = params.search;
    if (params.status && params.status !== 'all') {
      queryParams.isPublished = params.status === 'published' ? 'true' : 'false';
    }
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

    return this.request<BlogListResponse>('/admin', {
      params: queryParams,
    });
  }
}

export const blogService = new BlogService();


