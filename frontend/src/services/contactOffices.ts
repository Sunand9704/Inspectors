import { apiClient } from '@/utils/api';

export interface OfficeData {
  region: string;
  country: string;
  office_name: string;
  address: string;
  phone: string;
  emails: string[];
  is_lab_facility: boolean;
  notes: string;
  image_url?: string;
}

export async function fetchContactOffices(): Promise<{ region_name: string; offices: OfficeData[] }[]> {
  try {
    // Fetch from API (database)
    const { data } = await apiClient.get('/api/contact-offices');
    if (data && Array.isArray(data) && data.length > 0) {
      return data;
    }
    // Return empty array if API returns empty
    console.warn('API returned empty data');
    return [];
  } catch (error) {
    // Log error and return empty array
    console.error('Failed to fetch contact offices from API:', error);
    return [];
  }
}

export type ContactInquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  industry?: string;
  service?: string;
  message: string;
  consent: boolean;
};

export async function sendContactInquiry(payload: ContactInquiry): Promise<{ success: boolean; message: string }>{
  const { data } = await apiClient.post('/api/contact', payload);
  return data;
}


