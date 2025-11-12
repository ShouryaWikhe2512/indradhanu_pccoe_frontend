import type { NextApiRequest, NextApiResponse } from 'next';
import { CitizenIncentive } from '@/types/report';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CitizenIncentive[] | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/citizen/incentives`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data: CitizenIncentive[] = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching incentives:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to fetch incentives',
    });
  }
}

