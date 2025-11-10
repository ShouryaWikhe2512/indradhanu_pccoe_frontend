import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ReportForm from '@/components/ReportForm';
import { submitReport } from '@/lib/api';
import { Location } from '@/types/report';
import { useI18n } from '@/lib/i18n';

export default function ReportPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    category: string;
    photos: string[];
    location: Location;
    notes?: string;
  }) => {
    setIsSubmitting(true);

    try {
      const reportId = await submitReport(data);

      // Redirect to result page
      router.push(`/report/result/${reportId}`);
    } catch (error) {
      console.error('Failed to submit report:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('report.title')}
        </h1>
        <p className="text-gray-600">
          Please provide details about the issue you want to report.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <ReportForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}

