import type { NextApiRequest, NextApiResponse } from 'next';
import { ClassificationResult } from '@/types/report';

// This is a proxy route that forwards to your backend validation endpoint
// Replace BACKEND_URL with your actual backend URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClassificationResult | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { report_id } = req.body;

  if (!report_id) {
    return res.status(400).json({ message: 'report_id is required' });
  }

  try {
    // Forward the request to your backend validation endpoint
    const response = await fetch(`${BACKEND_URL}/api/reports/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ report_id }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data: ClassificationResult = await response.json();

    // Ensure the response matches our ClassificationResult interface
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error validating report:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to validate report',
    });
  }
}

