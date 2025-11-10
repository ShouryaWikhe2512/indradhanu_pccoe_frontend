import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMyReports } from '@/lib/api';
import { Report } from '@/types/report';
import { useI18n } from '@/lib/i18n';

export default function MyReportsPage() {
  const { t } = useI18n();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await getMyReports();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-saffron"></div>
        <p className="mt-4 text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadReports}
            className="px-4 py-2 bg-saffron text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('my_reports.title')}
        </h1>
        <p className="text-gray-600">
          View and manage all your submitted reports.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 mb-6">{t('my_reports.empty')}</p>
          <Link
            href="/report"
            className="inline-block px-6 py-3 bg-saffron text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 transition-colors font-medium"
          >
            {t('landing.cta')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Link
              key={report.report_id}
              href={`/report/result/${report.report_id}`}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-saffron"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {report.report_id}
                </h3>
                <span className="px-2 py-1 bg-saffron bg-opacity-10 text-saffron text-xs font-medium rounded">
                  {report.category.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-medium">Location:</span>{' '}
                  {report.location.lat.toFixed(4)}, {report.location.lon.toFixed(4)}
                </p>
                {report.location.ward && (
                  <p>
                    <span className="font-medium">Ward:</span> {report.location.ward}
                  </p>
                )}
                <p>
                  <span className="font-medium">Reported:</span>{' '}
                  {new Date(report.reported_at).toLocaleDateString()}
                </p>
              </div>

              {report.photos.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>📸</span>
                  <span>{report.photos.length} photo(s)</span>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-indian-blue font-medium">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

