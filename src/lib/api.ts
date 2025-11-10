import axios, { AxiosInstance } from 'axios';
import { Report, ClassificationResult, ReportSubmission } from '@/types/report';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API response types
interface SubmitReportResponse {
  report_id: string;
}

interface UploadPhotoResponse {
  url: string;
}

/**
 * Submit a new report to the backend
 */
export async function submitReport(
  report: ReportSubmission
): Promise<string> {
  try {
    const response = await apiClient.post<SubmitReportResponse>(
      '/api/reports/submit',
      report
    );
    return response.data.report_id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to submit report'
      );
    }
    throw error;
  }
}

/**
 * Upload a photo file to the backend
 */
export async function uploadPhoto(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post<UploadPhotoResponse>(
      '/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to upload photo'
      );
    }
    throw error;
  }
}

/**
 * Validate and classify a report (via proxy route)
 */
export async function validateReport(
  reportId: string
): Promise<ClassificationResult> {
  try {
    const response = await apiClient.post<ClassificationResult>(
      '/api/proxy/validate',
      { report_id: reportId }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to validate report'
      );
    }
    throw error;
  }
}

/**
 * Fetch a report by ID
 */
export async function getReport(reportId: string): Promise<Report> {
  try {
    const response = await apiClient.get<Report>(`/api/reports/${reportId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch report'
      );
    }
    throw error;
  }
}

/**
 * Submit feedback on classification (confirm or contest)
 */
export async function submitFeedback(
  reportId: string,
  feedback: { confirmed: boolean; comment?: string }
): Promise<void> {
  try {
    await apiClient.post(`/api/reports/${reportId}/feedback`, feedback);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to submit feedback'
      );
    }
    throw error;
  }
}

/**
 * Escalate a report
 */
export async function escalateReport(reportId: string): Promise<void> {
  try {
    await apiClient.post(`/api/reports/escalate`, { report_id: reportId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to escalate report'
      );
    }
    throw error;
  }
}

/**
 * Get all reports for the current user
 */
export async function getMyReports(): Promise<Report[]> {
  try {
    const response = await apiClient.get<Report[]>('/api/reports');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch reports'
      );
    }
    throw error;
  }
}

