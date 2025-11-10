import React, { useState, useRef } from 'react';
import { useI18n } from '@/lib/i18n';
import { uploadPhoto } from '@/lib/api';

interface PhotoUploaderProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export default function PhotoUploader({
  photos,
  onPhotosChange,
  maxPhotos = 5,
}: PhotoUploaderProps) {
  const { t } = useI18n();
  const [uploading, setUploading] = useState<Record<number, number>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (photos.length + files.length > maxPhotos) {
      setErrors({ 0: `Maximum ${maxPhotos} photos allowed` });
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const index = photos.length + i;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({
          ...prev,
          [index]: 'Please upload an image file',
        }));
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [index]: 'File size must be less than 5MB',
        }));
        continue;
      }

      setUploading((prev) => ({ ...prev, [index]: 0 }));

      try {
        const url = await uploadPhoto(file);
        onPhotosChange([...photos, url]);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[index];
          return newErrors;
        });
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          [index]: error instanceof Error ? error.message : 'Upload failed',
        }));
      } finally {
        setUploading((prev) => {
          const newUploading = { ...prev };
          delete newUploading[index];
          return newUploading;
        });
      }
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  return (
    <div className="w-full space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {t('report.photos')}
      </label>
      <p className="text-sm text-gray-600">{t('report.photos.help')}</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        disabled={photos.length >= maxPhotos}
        className="hidden"
        id="photo-upload"
        aria-label="Upload photos"
      />

      <label
        htmlFor="photo-upload"
        className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron cursor-pointer transition-colors ${
          photos.length >= maxPhotos
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {t('report.photos.upload')}
      </label>

      {Object.keys(errors).length > 0 && (
        <div className="text-sm text-red-600 space-y-1">
          {Object.entries(errors).map(([index, error]) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {photos.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {uploading[index] !== undefined ? (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                  <div className="text-white text-sm">
                    {uploading[index]}%
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Remove photo ${index + 1}`}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {photos.length >= maxPhotos && (
        <p className="text-sm text-gray-500">
          Maximum {maxPhotos} photos reached
        </p>
      )}
    </div>
  );
}

