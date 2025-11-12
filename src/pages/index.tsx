import React, { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const statistics = [
    {
      value: "₹2,500 Cr",
      label: "Annual infrastructure savings through citizen vigilance",
      icon: "💰",
    },
    {
      value: "68%",
      label: "Faster issue resolution with community participation",
      icon: "⚡",
    },
    {
      value: "1.2M+",
      label: "Civic issues successfully addressed nationwide",
      icon: "✓",
    },
    {
      value: "45%",
      label: "Reduction in preventable infrastructure damage",
      icon: "📉",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-orange-500"></div>
              <div className="w-1 h-6 bg-white border border-gray-300"></div>
              <div className="w-1 h-6 bg-green-600"></div>
            </div>
            <span className="text-sm text-gray-600 font-medium">
              Government of India
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Digital India Initiative</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Elegant & Professional */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #CBD5E0 1px, transparent 1px), linear-gradient(to bottom, #CBD5E0 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-3 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-8">
                <div className="flex space-x-1">
                  <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
                  <div className="w-2 h-6 bg-white border border-gray-300 rounded-full"></div>
                  <div className="w-2 h-6 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Citizen Engagement Platform
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Building Tomorrow's India,
                <span className="block text-blue-900 mt-2">Together</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empowering citizens to actively participate in nation-building
                through responsible civic reporting. Your vigilance strengthens
                our infrastructure and communities.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-green-600"
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
                  <p className="text-gray-700">
                    Constitutional duty under Article 51A to safeguard public
                    property
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-green-600"
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
                  <p className="text-gray-700">
                    AI-verified reporting system for accuracy and efficiency
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-green-600"
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
                  <p className="text-gray-700">
                    Direct connectivity with relevant municipal authorities
                  </p>
                </div>
              </div>

              <a
                href="/report"
                className="inline-flex items-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                <span>Submit a Report</span>
                <svg
                  className="ml-3 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <p className="mt-4 text-sm text-gray-500">
                Secure • Confidential • Free of Cost
              </p>
            </div>

            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {statistics[currentStat].value}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {statistics[currentStat].label}
                      </div>
                    </div>
                    <div className="text-4xl">
                      {statistics[currentStat].icon}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">
                        24/7
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Available
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">AI</div>
                      <div className="text-xs text-gray-600 mt-1">Powered</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">
                        100%
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Free</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {statistics.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          currentStat === index
                            ? "bg-orange-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Civic Responsibility Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Constitutional Responsibility
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Active citizenship is the cornerstone of a thriving democracy.
              Every report contributes to sustainable development and improved
              quality of life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-blue-900"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Article 51A
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fundamental duty to protect and improve the natural environment
                and safeguard public property. Your reports uphold this
                Constitutional mandate.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl border border-green-100">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Each report creates safer neighborhoods, better infrastructure,
                and improved living standards for thousands of fellow citizens.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl border border-orange-100">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                National Progress
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Contributing to India's Smart Cities Mission, Sustainable
                Development Goals, and enhanced global competitiveness rankings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Streamlined Reporting Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our efficient, technology-driven system ensures your concerns
              reach the right authorities swiftly
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Document Issue",
                desc: "Capture photographic evidence of the civic issue with your device",
                icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
              },
              {
                step: "02",
                title: "Add Context",
                desc: "Provide relevant details and location information for accurate assessment",
                icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
              },
              {
                step: "03",
                title: "AI Verification",
                desc: "Advanced algorithms verify, classify, and prioritize your submission",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              },
              {
                step: "04",
                title: "Resolution",
                desc: "Report forwarded to appropriate department for prompt remedial action",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg
                      className="w-8 h-8 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Measurable Impact on Nation Building
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Data-driven insights demonstrating the effectiveness of citizen
              participation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Individual Benefits
                  </h3>
                  <ul className="space-y-2 text-blue-100 text-sm">
                    <li>• Enhanced neighborhood safety and cleanliness</li>
                    <li>• Reduced vehicle maintenance costs</li>
                    <li>• Improved property valuations</li>
                    <li>• Better quality of life for families</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Municipal Impact
                  </h3>
                  <ul className="space-y-2 text-blue-100 text-sm">
                    <li>• Data-driven urban planning decisions</li>
                    <li>• Optimized resource allocation</li>
                    <li>• Enhanced civic infrastructure</li>
                    <li>• Improved city rankings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    National Progress
                  </h3>
                  <ul className="space-y-2 text-blue-100 text-sm">
                    <li>• Smart Cities Mission advancement</li>
                    <li>• Sustainable Development Goals</li>
                    <li>• Improved Ease of Living Index</li>
                    <li>• Strengthened democratic values</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">2.4M+</div>
              <div className="text-sm text-blue-100">Citizens Engaged</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">1.8M+</div>
              <div className="text-sm text-blue-100">Issues Resolved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">₹3,200Cr</div>
              <div className="text-sm text-blue-100">Public Funds Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">85%</div>
              <div className="text-sm text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real outcomes from citizen vigilance and active participation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🏙️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Mumbai Metropolitan Region
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Over 50,000 infrastructure reports in 2023 resulted in 85%
                faster pothole remediation, reducing emergency repair costs by
                ₹180 crores annually.
              </p>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-700">₹180 Cr</div>
                <div className="text-xs text-gray-600">Annual Savings</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🌳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Delhi NCR
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Citizen reports on unauthorized construction helped preserve
                2,500+ trees and protected 15 designated green zones from
                encroachment.
              </p>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-700">2,500+</div>
                <div className="text-xs text-gray-600">Trees Protected</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">💧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Bengaluru Urban
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Proactive drainage issue reports prevented ₹320 crores in
                potential flood damage during monsoon 2023, protecting over
                50,000 residential properties.
              </p>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-700">₹320 Cr</div>
                <div className="text-xs text-gray-600">Damage Prevented</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join the Movement for Better Infrastructure
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Your active participation strengthens our democracy and builds a
            more sustainable, prosperous India for future generations.
          </p>

          <a
            href="/report"
            className="inline-flex items-center px-10 py-5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-lg"
          >
            <span>Submit Your First Report</span>
            <svg
              className="ml-3 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.012-1.857l-.867.867M5.012 10.143l-.867.867"
                />
              </svg>
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-600"
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
              <span>No Cost</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                </div>
                <span className="font-bold">Civic India</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering citizens to build a better tomorrow through
                responsible civic engagement.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white transition">
                    About Initiative
                  </a>
                </li>
                <li>
                  <a
                    href="/how-it-works"
                    className="hover:text-white transition"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/guidelines" className="hover:text-white transition">
                    Reporting Guidelines
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/data-protection"
                    className="hover:text-white transition"
                  >
                    Data Protection
                  </a>
                </li>
                <li>
                  <a
                    href="/accessibility"
                    className="hover:text-white transition"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: support@civicindia.gov.in</li>
                <li>Helpline: 1800-XXX-XXXX</li>
                <li className="pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Aligned with:</span>
                  </div>
                  <div className="text-xs mt-1">
                    Digital India | Smart Cities Mission
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400">
                © 2024 Government of India. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Last Updated: November 2024</span>
                <span>|</span>
                <span>Version 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
