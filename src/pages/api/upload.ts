import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';

// Disable body parsing, we'll handle it with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// This is a proxy route that forwards to your backend upload endpoint
// Replace BACKEND_URL with your actual backend URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ url: string } | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const fileArray = Array.isArray(files.image) ? files.image : [files.image];

    if (!fileArray[0]) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = fileArray[0];

    // Create FormData to forward to backend
    const formData = new FormData();
    const fileStream = fs.createReadStream(file.filepath);
    formData.append('image', fileStream, {
      filename: file.originalFilename || 'image.jpg',
      contentType: file.mimetype || 'image/jpeg',
    });

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/upload`, {
      method: 'POST',
      body: formData as any,
      headers: formData.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data = await response.json();

    // Clean up temporary file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({ url: data.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to upload file',
    });
  }
}

