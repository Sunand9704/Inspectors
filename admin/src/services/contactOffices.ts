import { api } from '@/lib/api';

export interface ContactOffice {
  _id?: string;
  region_name: string;
  region: string;
  country: string;
  office_name: string;
  address: string;
  phone: string;
  emails: string[];
  is_lab_facility: boolean;
  notes: string;
  image_url: string;
  region_order: number;
  office_order: number;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to create FormData for file uploads
const createFormData = (data: Partial<ContactOffice>, file?: File): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'emails' && Array.isArray(value)) {
      formData.append(key, value.join(','));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  
  if (file) {
    formData.append('image', file);
  }
  
  return formData;
};

export async function listContactOffices(): Promise<ContactOffice[]> {
  try {
    const { data } = await api.get('/api/contact-offices/admin');
    return data.data || [];
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || 'Failed to fetch contact offices');
  }
}

export async function getContactOffice(id: string): Promise<ContactOffice> {
  try {
    const { data } = await api.get(`/api/contact-offices/admin/${id}`);
    return data.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || 'Failed to fetch contact office');
  }
}

export async function createContactOffice(data: Partial<ContactOffice>, file?: File): Promise<ContactOffice> {
  try {
    const formData = createFormData(data, file);
    const { data: responseData } = await api.post('/api/contact-offices/admin', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responseData.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || 'Failed to create contact office');
  }
}

export async function updateContactOffice(id: string, data: Partial<ContactOffice>, file?: File): Promise<ContactOffice> {
  try {
    const formData = createFormData(data, file);
    const { data: responseData } = await api.put(`/api/contact-offices/admin/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responseData.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || 'Failed to update contact office');
  }
}

export async function deleteContactOffice(id: string): Promise<void> {
  try {
    await api.delete(`/api/contact-offices/admin/${id}`);
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || 'Failed to delete contact office');
  }
}
