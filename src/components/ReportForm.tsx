import React, { useState } from 'react';
import { Location } from '@/types/report';
import LocationPicker from './LocationPicker';
import PhotoUploader from './PhotoUploader';
import { useI18n } from '@/lib/i18n';

interface ReportFormProps {
  onSubmit: (data: {
    category: string;
    photos: string[];
    location: Location;
    notes?: string;
  }) => Promise<void>;
  isSubmitting?: boolean;
}

const CATEGORIES = [
  'Drainage',
  'Waste Dumping',
  'Illegal Construction',
  'Green Cover Loss',
  'Air Quality',
  'Road Damage',
  'Street Lighting',
  'Water Supply',
  'Noise Pollution',
  'Animal Menace',
  'Other',
];

export default function ReportForm({ onSubmit, isSubmitting = false }: ReportFormProps) {
  const { t } = useI18n();
  const [category, setCategory] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [locationError, setLocationError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!location) {
      newErrors.location = 'Please provide a location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !location) {
      return;
    }

    try {
      await onSubmit({
        category,
        photos,
        location,
        notes: notes.trim() || undefined,
      });
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to submit report',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t('report.category')} <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.category;
              return newErrors;
            });
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
          required
          aria-required="true"
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'category-error' : undefined}
        >
          <option value="">{t('report.category.select')}</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '_')}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p id="category-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <LocationPicker
          value={location}
          onChange={(loc) => {
            setLocation(loc);
            setLocationError(null);
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.location;
              return newErrors;
            });
          }}
          onError={(error) => {
            setLocationError(error);
            setErrors((prev) => ({ ...prev, location: error }));
          }}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.location}
          </p>
        )}
        {locationError && !errors.location && (
          <p className="mt-1 text-sm text-yellow-600">{locationError}</p>
        )}
      </div>

      <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t('report.notes')}
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent"
          placeholder={t('report.notes.placeholder')}
          aria-label="Additional notes about the issue"
        />
      </div>

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600" role="alert">
            {errors.submit}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-saffron text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
      >
        {isSubmitting ? t('report.submitting') : t('report.submit')}
      </button>
    </form>
  );
}

