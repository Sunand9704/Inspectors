
import { apiClient } from '@/utils/api';

export interface StaticTranslations {
  navbar: {
    services: string;
    industries: string;
    vacancies: string;
    about: string;
    contact: string;
    getQuote: string;
    contactUs: string;
  };
  footer: {
    company: string;
    description: string;
    services: {
      title: string;
      list: string[];
    };
    industries: {
      title: string;
      list: string[];
    };
    contact: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
    newsletter: string;
    placeholderEmail: string;
  };
  pages?: {
    services?: {
      hero?: {
        title: string;
        subtitle: string;
        description: string;
        primaryCTAText: string;
        secondaryCTAText: string;
      };
    };
    about?: {
      title: string;
      breadcrumb: {
        home: string;
        about: string;
      };
      loading: string;
      error: string;
    };
    careers?: {
      title: string;
      description: string;
      applyNow: string;
      hiringProcess: {
        title: string;
        description: string;
        steps: {
          review: { title: string; description: string };
          interview: { title: string; description: string };
          assessment: { title: string; description: string };
          final: { title: string; description: string };
        };
      };
      currentOpenings: {
        loadingText: string;
        generalApplicationText: string;
        submitGeneralApplication: string;
      };
      generalApplication: {
        title: string;
        personalInfo: {
          title: string;
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
        };
        positionInfo: {
          title: string;
          desiredPosition: string;
          desiredPositionPlaceholder: string;
          preferredDepartment: string;
          preferredDepartmentPlaceholder: string;
          departments: {
            engineering: string;
            healthcare: string;
            technology: string;
            manufacturing: string;
            environmental: string;
            sales: string;
            marketing: string;
            finance: string;
            humanResources: string;
            operations: string;
            other: string;
          };
        };
        experience: {
          label: string;
          placeholder: string;
          options: {
            zeroToOne: string;
            twoToThree: string;
            fourToFive: string;
            sixToEight: string;
            nineToTwelve: string;
            thirteenPlus: string;
          };
        };
        resume: {
          label: string;
          uploadText: string;
          maxSize: string;
          chooseFile: string;
        };
        coverLetter: {
          label: string;
          placeholder: string;
        };
        actions: {
          reset: string;
          submit: string;
          submitting: string;
        };
        toasts: {
          invalidFileType: string;
          invalidFileTypeDesc: string;
          fileTooLarge: string;
          fileTooLargeDesc: string;
          resumeRequired: string;
          resumeRequiredDesc: string;
          missingInfo: string;
          missingInfoDesc: string;
          invalidEmail: string;
          invalidEmailDesc: string;
          successTitle: string;
          successDesc: string;
          failureTitle: string;
          failureDesc: string;
        };
      };
    };
    verifyDocuments?: {
      hero: {
        badge: string;
        title: string;
        description: string;
        ctaButton: string;
        securityNote: string;
      };
      form: {
        title: string;
        description: string;
        labels: {
          firstName: string;
          lastName: string;
          email: string;
          location: string;
          company: string;
          jobTitle: string;
          comments: string;
        };
        placeholders: {
          firstName: string;
          lastName: string;
          email: string;
          location: string;
          company: string;
          jobTitle: string;
          comments: string;
        };
        upload: {
          label: string;
          dragDrop: string;
          fileInfo: string;
          selectFiles: string;
          remove: string;
        };
        locations: Record<string, string>;
        cta: {
          submit: string;
          submitting: string;
        };
      };
      sidebar: {
        whatNext: {
          title: string;
          steps: Array<{
            number: string;
            title: string;
            description: string;
          }>;
        };
        assistance: {
          title: string;
          description: string;
        };
      };
      toast: {
        invalidFiles: string;
        success: string;
        error: string;
      };
    };
  };
  services?: {
    completeServicePortfolio: {
      heading: string;
      subheading: string;
    };
    servicesList: Array<{
      id: number;
      title: string;
      description: string;
      icon: any;
      link: string;
      imageUrl: string;
      features: string[];
    }>;
  };
  industryStats?: Array<{
    number: string;
    label: string;
    description: string;
    startYear?: number;
  }>;
}

export interface TranslationResponse {
  success: boolean;
  data: {
    language: string;
    translations: StaticTranslations;
    timestamp: string;
  };
}

export interface AllTranslationsResponse {
  success: boolean;
  data: {
    supportedLanguages: string[];
    translations: Record<string, StaticTranslations>;
    timestamp: string;
  };
}

class TranslationService {
  private cache = new Map<string, { data: StaticTranslations; timestamp: number }>();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  async getStaticTranslations(language: string): Promise<StaticTranslations> {
    const cacheKey = `static_${language}_v2`;
    const cached = this.cache.get(cacheKey);
    
    // Check if cached data is still valid
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await apiClient.get<TranslationResponse>(
        `/api/translate/static/${language}`
      );
      
      if (response.data.success) {
        // Cache the response
        this.cache.set(cacheKey, {
          data: response.data.data.translations,
          timestamp: Date.now()
        });
        
        return response.data.data.translations;
      } else {
        throw new Error('Failed to fetch translations');
      }
    } catch (error) {
      console.error(`Error fetching translations for ${language}:`, error);
      throw error;
    }
  }

  async getAllStaticTranslations(): Promise<Record<string, StaticTranslations>> {
    try {
      const response = await apiClient.get<AllTranslationsResponse>(
        `/api/translate/static`
      );
      
      if (response.data.success) {
        // Cache all translations
        Object.entries(response.data.data.translations).forEach(([lang, translations]: [string, StaticTranslations]) => {
          this.cache.set(`static_${lang}_v2`, {
            data: translations,
            timestamp: Date.now()
          });
        });
        
        return response.data.data.translations;
      } else {
        throw new Error('Failed to fetch all translations');
      }
    } catch (error) {
      console.error('Error fetching all translations:', error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCachedTranslations(language: string): StaticTranslations | null {
    const cached = this.cache.get(`static_${language}_v2`);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }
}

export const translationService = new TranslationService();
export default translationService;


