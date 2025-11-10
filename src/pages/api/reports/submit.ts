import type { NextApiRequest, NextApiResponse } from 'next';
import { ReportSubmission } from '@/types/report';

// This is a proxy route that forwards to your backend submit endpoint
// Replace BACKEND_URL with your actual backend URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ report_id: string } | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const reportData: ReportSubmission = req.body;

    // Validate required fields
    if (!reportData.category || !reportData.location) {
      return res.status(400).json({ message: 'Category and location are required' });
    }

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/reports/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Backend responded with status ${response.status}`
      );
    }

    const data = await response.json();

    return res.status(200).json({ report_id: data.report_id });
  } catch (error) {
    console.error('Error submitting report:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to submit report',
    });
  }
}

