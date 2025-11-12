import type { NextApiRequest, NextApiResponse } from 'next';
import { DataAnalysis } from '@/types/report';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataAnalysis | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { report_id, analysis_type } = req.query;

  try {
    const params = new URLSearchParams();
    if (report_id && typeof report_id === 'string') {
      params.append('report_id', report_id);
    }
    if (analysis_type && typeof analysis_type === 'string') {
      params.append('analysis_type', analysis_type);
    }

    const url = `${BACKEND_URL}/api/admin/data-analysis${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data: DataAnalysis = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data analysis:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to fetch data analysis',
    });
  }
}

