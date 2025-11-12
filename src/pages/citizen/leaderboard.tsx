import React, { useState, useEffect } from "react";
import CitizenLayout from "@/components/CitizenLayout";
import { getLeaderboard } from "@/lib/api";
import { MunicipalityLeaderboard } from "@/types/report";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<MunicipalityLeaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load leaderboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case "gold":
        return "🥇";
      case "silver":
        return "🥈";
      case "bronze":
        return "🥉";
      default:
        return "🏆";
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 border-yellow-300";
    if (rank === 2) return "bg-gray-100 border-gray-300";
    if (rank === 3) return "bg-orange-100 border-orange-300";
    return "bg-white border-gray-200";
  };

  return (
    <CitizenLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Municipality Leaderboard
              </h1>
              <p className="text-lg text-gray-600">
                See which municipalities are leading in civic issue resolution
              </p>
            </div>
            <button
              onClick={loadLeaderboard}
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
            <p className="text-gray-600 font-medium">Loading leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
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
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <p className="text-gray-600 font-medium text-lg">
              No leaderboard data available
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* 2nd Place */}
                <div className="flex flex-col items-center pt-8">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl mb-2">
                    🥈
                  </div>
                  <p className="font-bold text-gray-900 text-lg">
                    {leaderboard[1].municipality_name}
                  </p>
                  <p className="text-sm text-gray-600">Rank #2</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Score: {leaderboard[1].score.toFixed(1)}
                  </p>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center pt-4">
                  <div className="w-20 h-20 rounded-full bg-yellow-200 flex items-center justify-center text-3xl mb-2 shadow-lg">
                    🥇
                  </div>
                  <p className="font-bold text-gray-900 text-xl">
                    {leaderboard[0].municipality_name}
                  </p>
                  <p className="text-sm text-gray-600">Rank #1</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Score: {leaderboard[0].score.toFixed(1)}
                  </p>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center pt-12">
                  <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center text-2xl mb-2">
                    🥉
                  </div>
                  <p className="font-bold text-gray-900 text-lg">
                    {leaderboard[2].municipality_name}
                  </p>
                  <p className="text-sm text-gray-600">Rank #3</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Score: {leaderboard[2].score.toFixed(1)}
                  </p>
                </div>
              </div>
            )}

            {/* Full Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Municipality
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total Reports
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Resolved
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Resolution Rate
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Avg. Resolution Time
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaderboard.map((municipality) => (
                      <tr
                        key={municipality.municipality_id}
                        className={`hover:bg-gray-50 transition-colors ${getRankColor(
                          municipality.rank
                        )}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">
                              #{municipality.rank}
                            </span>
                            {municipality.badge && (
                              <span className="text-xl">
                                {getBadgeIcon(municipality.badge)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">
                            {municipality.municipality_name}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-900 font-medium">
                            {municipality.total_reports}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-green-600 font-semibold">
                            {municipality.resolved_reports}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-900 font-semibold">
                            {municipality.resolution_rate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-600">
                            {municipality.average_resolution_time_days.toFixed(
                              1
                            )}{" "}
                            days
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-3 py-1 bg-sustainable/10 text-sustainable rounded-full text-sm font-bold">
                            {municipality.score.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </CitizenLayout>
  );
}

