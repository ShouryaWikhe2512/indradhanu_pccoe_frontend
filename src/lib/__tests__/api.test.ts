import axios from 'axios';
import {
  submitReport,
  uploadPhoto,
  validateReport,
  getReport,
} from '../api';
import { ReportSubmission, ClassificationResult } from '@/types/report';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('submitReport', () => {
    it('successfully submits a report', async () => {
      const mockReport: ReportSubmission = {
        category: 'road_damage',
        photos: ['url1', 'url2'],
        location: { lat: 18.5204, lon: 73.8567, ward: 'Ward 12' },
        notes: 'Test notes',
      };

      mockedAxios.create = jest.fn(() => ({
        post: jest.fn().mockResolvedValue({
          data: { report_id: 'R12345' },
        }),
      })) as any;

      const result = await submitReport(mockReport);
      expect(result).toBe('R12345');
    });

    it('handles submission errors', async () => {
      mockedAxios.create = jest.fn(() => ({
        post: jest.fn().mockRejectedValue({
          response: { data: { message: 'Submission failed' } },
        }),
      })) as any;

      await expect(
        submitReport({
          category: 'road_damage',
          photos: [],
          location: { lat: 0, lon: 0 },
        })
      ).rejects.toThrow('Submission failed');
    });
  });

  describe('validateReport', () => {
    it('successfully validates a report', async () => {
      const mockResult: ClassificationResult = {
        is_real: true,
        category: 'road_damage',
        subcategory: 'pothole',
        confidence: 0.93,
        reasoning: 'Test reasoning',
        recommended_action: 'High urgency',
        validated_at: '2025-10-30T15:28:00+05:30',
      };

      mockedAxios.create = jest.fn(() => ({
        post: jest.fn().mockResolvedValue({
          data: mockResult,
        }),
      })) as any;

      const result = await validateReport('R12345');
      expect(result).toEqual(mockResult);
    });
  });

  describe('getReport', () => {
    it('successfully fetches a report', async () => {
      const mockReport = {
        report_id: 'R12345',
        category: 'road_damage',
        photos: ['url1'],
        location: { lat: 18.5204, lon: 73.8567 },
        reported_at: '2025-10-30T15:23:00+05:30',
      };

      mockedAxios.create = jest.fn(() => ({
        get: jest.fn().mockResolvedValue({
          data: mockReport,
        }),
      })) as any;

      const result = await getReport('R12345');
      expect(result).toEqual(mockReport);
    });
  });
});

