import type { NextApiRequest, NextApiResponse } from 'next';
import { CitizenStats } from '@/types/report';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CitizenStats | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/citizen/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data: CitizenStats = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching citizen stats:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to fetch stats',
    });
  }
}

