import type { NextApiRequest, NextApiResponse } from 'next';
import { Report } from '@/types/report';

// This is a proxy route that forwards to your backend
// Replace BACKEND_URL with your actual backend URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Report | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Report ID is required' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/reports/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ message: 'Report not found' });
      }
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data: Report = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching report:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to fetch report',
    });
  }
}

