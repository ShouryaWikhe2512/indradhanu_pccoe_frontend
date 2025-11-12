import axios, { AxiosInstance } from 'axios';
import { Report, ClassificationResult, ReportSubmission, ReportWithClassification, ResourceAllocation, WorkValidation, DataAnalysis, MunicipalityLeaderboard, CitizenIncentive, CitizenStats } from '@/types/report';

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

/**
 * Get all validated reports for admin dashboard
 */
export async function getValidatedReports(): Promise<ReportWithClassification[]> {
  try {
    const response = await apiClient.get<ReportWithClassification[]>('/api/admin/validated-reports');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch validated reports'
      );
    }
    throw error;
  }
}

/**
 * Get resource allocation for a report
 */
export async function getResourceAllocation(reportId: string): Promise<ResourceAllocation> {
  try {
    const response = await apiClient.get<ResourceAllocation>(`/api/admin/resource-allocation/${reportId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch resource allocation'
      );
    }
    throw error;
  }
}

/**
 * Get all work validations
 */
export async function getWorkValidations(): Promise<WorkValidation[]> {
  try {
    const response = await apiClient.get<WorkValidation[]>('/api/admin/work-validations');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch work validations'
      );
    }
    throw error;
  }
}

/**
 * Validate work (before/after images)
 */
export async function validateWork(validationId: string): Promise<WorkValidation> {
  try {
    const response = await apiClient.post<WorkValidation>(
      `/api/admin/work-validations/${validationId}/validate`,
      {}
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to validate work'
      );
    }
    throw error;
  }
}

/**
 * Get data analysis
 */
export async function getDataAnalysis(params?: {
  report_id?: string;
  analysis_type?: 'overall' | 'category' | 'location' | 'time_period';
}): Promise<DataAnalysis> {
  try {
    const response = await apiClient.get<DataAnalysis>('/api/admin/data-analysis', {
      params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch data analysis'
      );
    }
    throw error;
  }
}

/**
 * Get municipality leaderboard
 */
export async function getLeaderboard(): Promise<MunicipalityLeaderboard[]> {
  try {
    const response = await apiClient.get<MunicipalityLeaderboard[]>('/api/citizen/leaderboard');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch leaderboard'
      );
    }
    throw error;
  }
}

/**
 * Get citizen incentives
 */
export async function getMyIncentives(): Promise<CitizenIncentive[]> {
  try {
    const response = await apiClient.get<CitizenIncentive[]>('/api/citizen/incentives');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch incentives'
      );
    }
    throw error;
  }
}

/**
 * Get citizen stats
 */
export async function getMyStats(): Promise<CitizenStats> {
  try {
    const response = await apiClient.get<CitizenStats>('/api/citizen/stats');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch stats'
      );
    }
    throw error;
  }
}

