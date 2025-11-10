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

  const { report_id } = req.body;

  if (!report_id) {
    return res.status(400).json({ message: 'report_id is required' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/reports/escalate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ report_id }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error escalating report:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to escalate report',
    });
  }
}

