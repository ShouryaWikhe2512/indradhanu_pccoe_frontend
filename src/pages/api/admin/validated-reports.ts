import type { NextApiRequest, NextApiResponse } from 'next';
import { ReportWithClassification } from '@/types/report';

// This is a proxy route that forwards to your backend
// Replace BACKEND_URL with your actual backend URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReportWithClassification[] | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/validated-reports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data: ReportWithClassification[] = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching validated reports:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to fetch validated reports',
    });
  }
}

