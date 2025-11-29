import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8021/api';

export interface VerifyDocumentsData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  company?: string;
  jobTitle?: string;
  comments?: string;
}

export async function sendDocumentVerification(
  data: VerifyDocumentsData,
  files: File[]
): Promise<{ success: boolean; message: string; filesCount: number }> {
  const formData = new FormData();
  
  // Append form fields
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('email', data.email);
  formData.append('location', data.location);
  
  if (data.company) formData.append('company', data.company);
  if (data.jobTitle) formData.append('jobTitle', data.jobTitle);
  if (data.comments) formData.append('comments', data.comments);
  
  // Append files
  files.forEach((file) => {
    formData.append('documents', file);
  });

  const response = await axios.post(`${API_BASE_URL}/verify-documents`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
