import React, { useState, useEffect } from "react";
import CitizenLayout from "@/components/CitizenLayout";
import { getMyIncentives, getMyStats } from "@/lib/api";
import { CitizenIncentive, CitizenStats } from "@/types/report";

export default function IncentivesPage() {
  const [incentives, setIncentives] = useState<CitizenIncentive[]>([]);
  const [stats, setStats] = useState<CitizenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [incentivesData, statsData] = await Promise.all([
        getMyIncentives(),
        getMyStats(),
      ]);
      setIncentives(incentivesData);
      setStats(statsData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load incentives"
      );
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "credited":
        return "bg-green-100 text-green-800 border-green-300";
      case "approved":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getIncentiveIcon = (type: string) => {
    switch (type) {
      case "points":
        return "⭐";
      case "cash":
        return "💰";
      case "badge":
        return "🏅";
      case "recognition":
        return "👏";
      default:
        return "🎁";
    }
  };

  return (
    <CitizenLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Incentives
          </h1>
          <p className="text-lg text-gray-600">
            Track your rewards and incentives for reporting issues
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Points
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.total_points}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
                  ⭐
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Incentives
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.total_incentives}
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Validated Reports
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.validated_reports}
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Badges</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.badges.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                  🏅
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Badges Display */}
        {stats && stats.badges.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Badges</h2>
            <div className="flex flex-wrap gap-4">
              {stats.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-sustainable/10 border border-sustainable/20 rounded-lg flex items-center gap-2"
                >
                  <span className="text-2xl">🏅</span>
                  <span className="font-semibold text-gray-900">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
            <p className="text-gray-600 font-medium">Loading incentives...</p>
          </div>
        ) : incentives.length === 0 ? (
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 font-medium text-lg mb-2">
              No incentives yet
            </p>
            <p className="text-gray-500 text-sm">
              Start reporting issues to earn rewards and incentives
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {incentives.map((incentive) => (
              <div
                key={incentive.incentive_id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">
                      {getIncentiveIcon(incentive.incentive_type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {incentive.description}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Report ID: {incentive.report_id}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Earned: {formatDate(incentive.earned_at)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                      incentive.status
                    )}`}
                  >
                    {incentive.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  {incentive.incentive_type === "points" && incentive.points && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Points</p>
                      <p className="text-xl font-bold text-gray-900">
                        {incentive.points} ⭐
                      </p>
                    </div>
                  )}
                  {incentive.incentive_type === "cash" && incentive.amount && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Amount</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(incentive.amount)}
                      </p>
                    </div>
                  )}
                  {incentive.incentive_type === "badge" && incentive.badge_name && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Badge</p>
                      <p className="text-xl font-bold text-gray-900">
                        🏅 {incentive.badge_name}
                      </p>
                    </div>
                  )}
                  {incentive.incentive_type === "recognition" && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Type</p>
                      <p className="text-xl font-bold text-gray-900">
                        👏 Recognition
                      </p>
                    </div>
                  )}
                  {incentive.credited_at && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Credited At</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatDate(incentive.credited_at)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CitizenLayout>
  );
}

