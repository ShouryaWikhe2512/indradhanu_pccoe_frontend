import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  getValidatedReports,
  getResourceAllocation,
} from "@/lib/api";
import {
  ReportWithClassification,
  ResourceAllocation,
} from "@/types/report";

export default function AdminDashboard() {
  const [reports, setReports] = useState<ReportWithClassification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] =
    useState<ReportWithClassification | null>(null);
  const [resourceAllocation, setResourceAllocation] =
    useState<ResourceAllocation | null>(null);
  const [loadingAllocation, setLoadingAllocation] = useState(false);
  const [allocationError, setAllocationError] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getValidatedReports();
      setReports(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load validated reports"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllocation = async (report: ReportWithClassification) => {
    setSelectedReport(report);
    setLoadingAllocation(true);
    setAllocationError(null);
    setResourceAllocation(null);

    try {
      const allocation = await getResourceAllocation(report.report_id);
      setResourceAllocation(allocation);
    } catch (err) {
      setAllocationError(
        err instanceof Error
          ? err.message
          : "Failed to load resource allocation"
      );
    } finally {
      setLoadingAllocation(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Manage validated citizen reports and resource allocations
              </p>
            </div>
            <button
              onClick={loadReports}
              disabled={loading}
              className="px-6 py-3 bg-sustainable text-white rounded-xl hover:bg-sustainable/90 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Validated Reports
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
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
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
                  Selected Report Budget
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {resourceAllocation
                    ? formatCurrency(resourceAllocation.total_budget)
                    : "₹0"}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sustainable mb-4"></div>
            <p className="text-gray-600 font-medium">Loading validated reports...</p>
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
            <p className="text-gray-600 font-medium text-lg">
              No validated reports found
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Validated reports from citizens will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reports List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Validated Reports
              </h2>
              {reports.map((report) => (
                <div
                  key={report.report_id}
                  className={`bg-white rounded-xl shadow-lg border-2 transition-all cursor-pointer ${
                    selectedReport?.report_id === report.report_id
                      ? "border-sustainable shadow-xl"
                      : "border-gray-100 hover:border-sustainable/50"
                  }`}
                  onClick={() => handleViewAllocation(report)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {report.report_id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(report.reported_at)}
                        </p>
                      </div>
                      {report.classification && (
                        <span className="px-3 py-1 bg-sustainable/10 text-sustainable rounded-full text-xs font-semibold">
                          {getCategoryLabel(report.classification.category)}
                        </span>
                      )}
                    </div>

                    {report.classification && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Confidence:</span>{" "}
                          {(report.classification.confidence * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {report.classification.reasoning}
                        </p>
                      </div>
                    )}

                    {report.notes && (
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                        {report.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {report.location.lat.toFixed(4)},{" "}
                        {report.location.lon.toFixed(4)}
                      </span>
                      {report.photos.length > 0 && (
                        <span className="flex items-center gap-1">
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
                          {report.photos.length} photo(s)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resource Allocation Panel */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Resource Allocation
              </h2>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-4">
                {!selectedReport ? (
                  <div className="text-center py-12">
                    <svg
                      className="w-16 h-16 text-gray-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">
                      Select a report to view resource allocation
                    </p>
                  </div>
                ) : loadingAllocation ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sustainable mb-4"></div>
                    <p className="text-gray-600 text-sm">
                      Loading resource allocation...
                    </p>
                  </div>
                ) : allocationError ? (
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 font-medium">
                      {allocationError}
                    </p>
                  </div>
                ) : resourceAllocation ? (
                  <div className="space-y-6">
                    {/* Priority Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Priority
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                          resourceAllocation.priority
                        )}`}
                      >
                        {resourceAllocation.priority.toUpperCase()}
                      </span>
                    </div>

                    {/* Total Budget */}
                    <div className="p-4 bg-gradient-to-r from-sustainable/10 to-sustainable/5 rounded-xl border border-sustainable/20">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Total Budget
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(resourceAllocation.total_budget)}
                      </p>
                    </div>

                    {/* Estimated Duration */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Estimated Duration
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {resourceAllocation.estimated_duration_days} day
                        {resourceAllocation.estimated_duration_days !== 1
                          ? "s"
                          : ""}
                      </p>
                    </div>

                    {/* Resources List */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        Required Resources
                      </p>
                      <div className="space-y-3">
                        {resourceAllocation.resources.map(
                          (resource, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {resource.resource_type}
                                  </p>
                                  {resource.description && (
                                    <p className="text-xs text-gray-600 mt-1">
                                      {resource.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-600">Quantity</p>
                                  <p className="font-semibold text-gray-900">
                                    {resource.quantity} {resource.unit}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Total Cost</p>
                                  <p className="font-semibold text-gray-900">
                                    {formatCurrency(resource.total_cost)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                {formatCurrency(resource.cost_per_unit)} per{" "}
                                {resource.unit}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Allocated At */}
                    {resourceAllocation.allocated_at && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Allocated: {formatDate(resourceAllocation.allocated_at)}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-sm">
                      No resource allocation available for this report
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

