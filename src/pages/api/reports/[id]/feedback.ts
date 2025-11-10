import type { NextApiRequest, NextApiResponse } from 'next';

// This is a proxy route that forwards to your backend
// Replace BACKEND_URL with your actual backend URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const { confirmed, comment } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Report ID is required' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/reports/${id}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmed, comment }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to submit feedback',
    });
  }
}

