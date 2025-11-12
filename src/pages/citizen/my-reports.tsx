import React, { useState, useEffect } from "react";
import CitizenLayout from "@/components/CitizenLayout";
import Link from "next/link";
import { getMyReports } from "@/lib/api";
import { Report } from "@/types/report";
import { useI18n } from "@/lib/i18n";

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
      setError(null);
      const data = await getMyReports();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <CitizenLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Reports
          </h1>
          <p className="text-lg text-gray-600">
            Track the status of all your submitted reports
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Reports
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {reports.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-sustainable/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-sustainable"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Reports with Photos
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {reports.filter((r) => r.photos.length > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  This Month
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {
                    reports.filter((r) => {
                      const reportDate = new Date(r.reported_at);
                      const now = new Date();
                      return (
                        reportDate.getMonth() === now.getMonth() &&
                        reportDate.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sustainable mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your reports...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadReports}
              className="px-6 py-3 bg-sustainable text-white rounded-xl hover:bg-sustainable/90 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-600 font-medium text-lg mb-2">
              No reports yet
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Start reporting issues to help improve your community
            </p>
            <Link
              href="/citizen-report"
              className="inline-block px-6 py-3 bg-sustainable text-white rounded-xl hover:bg-sustainable/90 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 transition-colors font-medium"
            >
              Report an Issue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Link
                key={report.report_id}
                href={`/report/result/${report.report_id}`}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-sustainable"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {report.report_id}
                  </h3>
                  <span className="px-3 py-1 bg-sustainable/10 text-sustainable text-xs font-semibold rounded-full">
                    {report.category.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {report.location.lat.toFixed(4)},{" "}
                    {report.location.lon.toFixed(4)}
                  </p>
                  {report.location.ward && (
                    <p>
                      <span className="font-medium">Ward:</span>{" "}
                      {report.location.ward}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Reported:</span>{" "}
                    {formatDate(report.reported_at)}
                  </p>
                </div>

                {report.photos.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{report.photos.length} photo(s)</span>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <span className="text-sm text-sustainable font-semibold flex items-center gap-2">
                    View Details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </CitizenLayout>
  );
}

