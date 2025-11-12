import type { NextApiRequest, NextApiResponse } from 'next';
import { WorkValidation } from '@/types/report';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WorkValidation | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Validation ID is required' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/work-validations/${id}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data: WorkValidation = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error validating work:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to validate work',
    });
  }
}

