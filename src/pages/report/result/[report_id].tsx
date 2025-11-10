import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ClassificationCard from '@/components/ClassificationCard';
import {
  getReport,
  validateReport,
  submitFeedback,
  escalateReport,
} from '@/lib/api';
import { Report, ClassificationResult } from '@/types/report';
import { useI18n } from '@/lib/i18n';

export default function ReportResultPage() {
  const router = useRouter();
  const { report_id } = router.query;
  const { t } = useI18n();
  const [report, setReport] = useState<Report | null>(null);
  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingAttempts, setPollingAttempts] = useState(0);

  const MAX_POLLING_ATTEMPTS = 10;
  const INITIAL_DELAY = 2000; // 2 seconds

  useEffect(() => {
    if (!report_id || typeof report_id !== 'string') return;

    loadReport();
  }, [report_id]);

  const loadReport = async () => {
    if (!report_id || typeof report_id !== 'string') return;

    try {
      setLoading(true);
      const reportData = await getReport(report_id);
      setReport(reportData);

      // If classification exists, set it
      if ((reportData as any).classification) {
        setClassification((reportData as any).classification);
      } else {
        // Start polling for classification
        pollForClassification();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const pollForClassification = async () => {
    if (!report_id || typeof report_id !== 'string') return;
    if (pollingAttempts >= MAX_POLLING_ATTEMPTS) {
      setError('Classification is taking longer than expected. Please try again later.');
      return;
    }

    setValidating(true);
    setPollingAttempts((prev) => prev + 1);

    try {
      const result = await validateReport(report_id);
      setClassification(result);
      setValidating(false);
    } catch (err) {
      // If validation fails, retry with exponential backoff
      const delay = INITIAL_DELAY * Math.pow(2, pollingAttempts);
      setTimeout(() => {
        pollForClassification();
      }, delay);
    }
  };

  const handleConfirm = async () => {
    if (!report_id || typeof report_id !== 'string') return;

    try {
      await submitFeedback(report_id, { confirmed: true });
      alert('Thank you for confirming the assessment.');
    } catch (err) {
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const handleContest = async () => {
    if (!report_id || typeof report_id !== 'string') return;

    const comment = prompt('Please provide additional details:');
    if (comment === null) return;

    try {
      await submitFeedback(report_id, {
        confirmed: false,
        comment: comment || undefined,
      });
      alert('Your feedback has been submitted. We will review it shortly.');
    } catch (err) {
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const handleEscalate = async () => {
    if (!report_id || typeof report_id !== 'string') return;

    if (!confirm('Are you sure you want to escalate this report?')) return;

    try {
      await escalateReport(report_id);
      alert('Report has been escalated to the ward officer.');
    } catch (err) {
      alert('Failed to escalate report. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-saffron"></div>
        <p className="mt-4 text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error || 'Report not found'}</p>
          <Link
            href="/"
            className="text-indian-blue hover:underline font-medium"
          >
            {t('common.back')} to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/my-reports"
          className="text-indian-blue hover:underline text-sm font-medium"
        >
          ← {t('common.back')}
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Report #{report.report_id}
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Category:</span>{' '}
            {report.category.replace(/_/g, ' ')}
          </p>
          <p>
            <span className="font-medium">Location:</span> {report.location.lat.toFixed(6)},{' '}
            {report.location.lon.toFixed(6)}
            {report.location.ward && ` (${report.location.ward})`}
          </p>
          <p>
            <span className="font-medium">Reported:</span>{' '}
            {new Date(report.reported_at).toLocaleString()}
          </p>
        </div>
      </div>

      {validating && !classification && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-6">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-blue-800">
            Validating and classifying your report... This may take a moment.
          </p>
        </div>
      )}

      {classification ? (
        <ClassificationCard
          classification={classification}
          onConfirm={handleConfirm}
          onContest={handleContest}
          onEscalate={handleEscalate}
        />
      ) : (
        !validating && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800">
              Classification is still being processed. Please check back later.
            </p>
          </div>
        )
      )}

      {report.photos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {report.photos.map((url, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={url}
                  alt={`Report photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {report.notes && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
            {report.notes}
          </p>
        </div>
      )}
    </div>
  );
}

