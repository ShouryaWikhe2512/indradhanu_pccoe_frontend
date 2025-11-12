import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { getDataAnalysis } from "@/lib/api";
import { DataAnalysis, Chart, Insight } from "@/types/report";

export default function DataAnalyserPage() {
  const [analysis, setAnalysis] = useState<DataAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<
    "overall" | "category" | "location" | "time_period"
  >("overall");

  useEffect(() => {
    loadAnalysis();
  }, [analysisType]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDataAnalysis({ analysis_type: analysisType });
      setAnalysis(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load data analysis"
      );
    } finally {
      setLoading(false);
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const renderChart = (chart: Chart) => {
    const maxValue = Math.max(...chart.data.map((d) => d.value));
    const chartHeight = 300;

    if (chart.type === "bar") {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {chart.title}
          </h3>
          <div className="flex items-end justify-between gap-2 h-64">
            {chart.data.map((point, idx) => {
              const height = (point.value / maxValue) * chartHeight;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center justify-end h-64">
                    <div
                      className="w-full rounded-t-lg bg-sustainable transition-all hover:bg-sustainable/80"
                      style={{ height: `${height}px` }}
                      title={`${point.label}: ${point.value}`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center truncate w-full">
                    {point.label}
                  </p>
                  <p className="text-xs font-semibold text-gray-900 mt-1">
                    {point.value}
                  </p>
                </div>
              );
            })}
          </div>
          {chart.x_axis_label && (
            <p className="text-xs text-gray-500 text-center mt-4">
              {chart.x_axis_label}
            </p>
          )}
          {chart.y_axis_label && (
            <p className="text-xs text-gray-500 text-center">
              {chart.y_axis_label}
            </p>
          )}
        </div>
      );
    }

    if (chart.type === "line") {
      const points = chart.data.map((point, idx) => ({
        x: (idx / (chart.data.length - 1)) * 100,
        y: 100 - (point.value / maxValue) * 100,
        label: point.label,
        value: point.value,
      }));

      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {chart.title}
          </h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <polyline
                points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#4DFFBE"
                strokeWidth="2"
              />
              {points.map((point, idx) => (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill="#4DFFBE"
                />
              ))}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
              {chart.data.map((point, idx) => (
                <span key={idx} className="truncate" style={{ width: `${100 / chart.data.length}%` }}>
                  {point.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (chart.type === "pie") {
      const total = chart.data.reduce((sum, d) => sum + d.value, 0);
      let currentAngle = 0;
      const colors = [
        "#4DFFBE",
        "#FF9933",
        "#138808",
        "#000080",
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#FFA07A",
      ];

      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {chart.title}
          </h3>
          <div className="flex items-center justify-center">
            <svg width="300" height="300" viewBox="0 0 100 100">
              {chart.data.map((point, idx) => {
                const percentage = (point.value / total) * 100;
                const angle = (percentage / 100) * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                currentAngle = endAngle;

                const startAngleRad = (startAngle * Math.PI) / 180;
                const endAngleRad = (endAngle * Math.PI) / 180;

                const x1 = 50 + 40 * Math.cos(startAngleRad);
                const y1 = 50 + 40 * Math.sin(startAngleRad);
                const x2 = 50 + 40 * Math.cos(endAngleRad);
                const y2 = 50 + 40 * Math.sin(endAngleRad);

                const largeArc = angle > 180 ? 1 : 0;

                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
                  `Z`,
                ].join(" ");

                return (
                  <path
                    key={idx}
                    d={pathData}
                    fill={colors[idx % colors.length]}
                    stroke="white"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>
          <div className="mt-6 space-y-2">
            {chart.data.map((point, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      backgroundColor: colors[idx % colors.length],
                    }}
                  ></div>
                  <span className="text-sm text-gray-700">{point.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {point.value} ({(point.value / total) * 100}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Data Analyser
              </h1>
              <p className="text-lg text-gray-600">
                AI-powered analytics and insights from citizen reports
              </p>
            </div>
            <div className="flex gap-2">
              <select
                value={analysisType}
                onChange={(e) =>
                  setAnalysisType(
                    e.target.value as
                      | "overall"
                      | "category"
                      | "location"
                      | "time_period"
                  )
                }
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sustainable focus:border-sustainable"
              >
                <option value="overall">Overall Analysis</option>
                <option value="category">By Category</option>
                <option value="location">By Location</option>
                <option value="time_period">By Time Period</option>
              </select>
              <button
                onClick={loadAnalysis}
                disabled={loading}
                className="px-6 py-2 bg-sustainable text-white rounded-xl hover:bg-sustainable/90 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
            <p className="text-gray-600 font-medium">
              Analyzing data with AI...
            </p>
          </div>
        ) : analysis ? (
          <div className="space-y-8">
            {/* Generated At */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <p className="text-sm text-gray-600">
                Analysis generated: {formatDate(analysis.generated_at)}
              </p>
            </div>

            {/* Charts */}
            {analysis.charts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Charts</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {analysis.charts.map((chart, idx) => (
                    <div key={idx}>{renderChart(chart)}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights */}
            {analysis.insights.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  AI Insights
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {analysis.insights.map((insight, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {insight.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImpactColor(
                            insight.impact
                          )}`}
                        >
                          {insight.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{insight.description}</p>
                      {insight.recommendation && (
                        <div className="p-4 bg-sustainable/10 border border-sustainable/20 rounded-lg">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Recommendation:
                          </p>
                          <p className="text-sm text-gray-700">
                            {insight.recommendation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.charts.length === 0 && analysis.insights.length === 0 && (
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-gray-600 font-medium text-lg">
                  No analysis data available
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try selecting a different analysis type
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <p className="text-gray-600 font-medium text-lg">
              No analysis available
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

