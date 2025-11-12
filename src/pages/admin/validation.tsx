import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { getWorkValidations, validateWork } from "@/lib/api";
import { WorkValidation } from "@/types/report";

export default function ValidationPage() {
  const [validations, setValidations] = useState<WorkValidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validatingId, setValidatingId] = useState<string | null>(null);

  useEffect(() => {
    loadValidations();
  }, []);

  const loadValidations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWorkValidations();
      setValidations(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load work validations"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (validation: WorkValidation) => {
    if (validation.validation_status !== "pending") return;

    setValidatingId(validation.report_id);
    try {
      const updated = await validateWork(validation.report_id);
      setValidations((prev) =>
        prev.map((v) => (v.report_id === updated.report_id ? updated : v))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to validate work"
      );
    } finally {
      setValidatingId(null);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Validation of Work
          </h1>
          <p className="text-lg text-gray-600">
            Verify completed work using AI-powered before/after image comparison
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Validations
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {validations.length}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Validation
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {validations.filter((v) => v.validation_status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Validated
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {validations.filter((v) => v.validation_status === "validated").length}
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
                    d="M5 13l4 4L19 7"
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
            <p className="text-gray-600 font-medium">Loading validations...</p>
          </div>
        ) : validations.length === 0 ? (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 font-medium text-lg">
              No work validations found
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Work validations will appear here when submitted
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {validations.map((validation) => (
              <div
                key={validation.report_id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Report {validation.report_id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Submitted: {formatDate(validation.submitted_at)}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                        validation.validation_status
                      )}`}
                    >
                      {validation.validation_status.toUpperCase()}
                    </span>
                  </div>

                  {/* Before/After Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Before Images
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {validation.before_images.map((img, idx) => (
                          <div
                            key={idx}
                            className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100"
                          >
                            <img
                              src={img}
                              alt={`Before ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        After Images
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {validation.after_images.map((img, idx) => (
                          <div
                            key={idx}
                            className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100"
                          >
                            <img
                              src={img}
                              alt={`After ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Validation Result */}
                  {validation.validation_result && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        AI Validation Result
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Completion Status</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {validation.validation_result.is_complete
                              ? "✓ Work Complete"
                              : "✗ Work Incomplete"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Confidence</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {(validation.validation_result.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Verification Score</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {validation.validation_result.verification_score.toFixed(1)}/10
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Verified At</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatDate(validation.validation_result.verified_at)}
                          </p>
                        </div>
                      </div>

                      {validation.validation_result.improvements_detected.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs text-gray-600 mb-2">Improvements Detected:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {validation.validation_result.improvements_detected.map(
                              (improvement, idx) => (
                                <li key={idx} className="text-sm text-green-700">
                                  {improvement}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {validation.validation_result.issues_remaining.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs text-gray-600 mb-2">Issues Remaining:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {validation.validation_result.issues_remaining.map(
                              (issue, idx) => (
                                <li key={idx} className="text-sm text-red-700">
                                  {issue}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Validate Button */}
                  {validation.validation_status === "pending" && (
                    <button
                      onClick={() => handleValidate(validation)}
                      disabled={validatingId === validation.report_id}
                      className="w-full px-6 py-3 bg-sustainable text-white rounded-xl hover:bg-sustainable/90 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {validatingId === validation.report_id ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Validating...
                        </>
                      ) : (
                        <>
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Validate with AI
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

