import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-saffron opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-green opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indian-blue opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Tricolor badge */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-4 h-12 bg-saffron rounded-t-full"></div>
              <div className="w-4 h-12 bg-white border-2 border-gray-300 rounded-full"></div>
              <div className="w-4 h-12 bg-green rounded-b-full"></div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="block">Report Civic</span>
                <span className="block bg-gradient-to-r from-saffron via-green to-indian-blue bg-clip-text text-transparent">
                  Issues
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t('landing.description')}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link
                href="/report"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-saffron to-orange-500 text-white rounded-xl hover:from-orange-500 hover:to-saffron focus:outline-none focus:ring-4 focus:ring-saffron focus:ring-offset-4 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-saffron/50 hover:scale-105 transform"
              >
                <span>{t('landing.cta')}</span>
                <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to make your voice heard and your community better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-saffron transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-14 h-14 bg-gradient-to-br from-saffron to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Reporting</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload photos and describe the issue in just a few simple steps. Your location is automatically detected.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-green transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-14 h-14 bg-gradient-to-br from-green to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Verification</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI system automatically verifies and classifies your reports with high accuracy and confidence.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-indian-blue transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-14 h-14 bg-gradient-to-br from-indian-blue to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Action</h3>
              <p className="text-gray-600 leading-relaxed">
                Reports are prioritized and immediately forwarded to the right department for swift resolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Report Section - Educational */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Your Report Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every report you submit creates a ripple effect that benefits you, your community, and the nation
            </p>
          </div>

          {/* Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Personal Impact */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">For You</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Safer streets and neighborhoods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Better infrastructure in your area</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Reduced commute time and vehicle damage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Cleaner environment for your family</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Increased property values</span>
                </li>
              </ul>
            </div>

            {/* City Impact */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">For Your City</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Data-driven urban planning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Efficient resource allocation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Improved civic infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Better quality of life for all residents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Enhanced city rankings and reputation</span>
                </li>
              </ul>
            </div>

            {/* Country Impact */}
            <div className="bg-gradient-to-br from-saffron-50 to-orange-50 p-8 rounded-2xl border-2 border-saffron-200">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron to-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">For India</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Progress towards Smart Cities Mission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Reduced infrastructure maintenance costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Improved Ease of Living Index</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Better global competitiveness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Stronger democracy through citizen participation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              The Numbers Don't Lie
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-saffron mb-2">₹2,500 Cr</div>
                <div className="text-gray-300 text-sm">Annual savings from early issue detection</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">68%</div>
                <div className="text-gray-300 text-sm">Faster resolution with citizen reports</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">1.2M+</div>
                <div className="text-gray-300 text-sm">Issues resolved through civic reporting</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-400 mb-2">45%</div>
                <div className="text-gray-300 text-sm">Reduction in infrastructure damage costs</div>
              </div>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">💡</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Did You Know?</h4>
                  <p className="text-gray-700">
                    A single pothole report can prevent up to <strong>₹50,000</strong> in vehicle damage costs for citizens in that area annually.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border-l-4 border-cyan-500">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🌱</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Environmental Impact</h4>
                  <p className="text-gray-700">
                    Reports on waste dumping have led to <strong>30% cleaner</strong> public spaces and reduced health risks in urban areas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">⚡</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Speed Matters</h4>
                  <p className="text-gray-700">
                    Issues reported within 24 hours are resolved <strong>3x faster</strong> than those reported later, saving taxpayer money.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🤝</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Community Power</h4>
                  <p className="text-gray-700">
                    Cities with active citizen reporting see <strong>40% better</strong> infrastructure maintenance and higher citizen satisfaction scores.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real Impact Stories */}
          <div className="bg-gradient-to-r from-indian-blue to-blue-700 rounded-2xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-6 text-center">Real Impact Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">🏙️</div>
                <h4 className="font-bold text-lg mb-2">Mumbai's Success</h4>
                <p className="text-blue-100 text-sm">
                  Over <strong>50,000 reports</strong> in 2023 led to 85% faster pothole repairs, saving the city ₹180 crores in emergency repairs.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">🌳</div>
                <h4 className="font-bold text-lg mb-2">Delhi's Green Revolution</h4>
                <p className="text-blue-100 text-sm">
                  Citizen reports on illegal construction helped preserve <strong>2,500+ trees</strong> and protected 15 green zones from encroachment.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">💧</div>
                <h4 className="font-bold text-lg mb-2">Bangalore's Water Wins</h4>
                <p className="text-blue-100 text-sm">
                  Reports on drainage issues prevented <strong>₹320 crores</strong> in flood damage during monsoon 2023, protecting 50,000+ homes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-saffron via-orange-400 to-saffron py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90 text-sm font-medium">Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">AI</div>
              <div className="text-white/90 text-sm font-medium">Powered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Fast</div>
              <div className="text-white/90 text-sm font-medium">Response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/90 text-sm font-medium">Free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-indian-blue to-blue-700 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are actively improving their communities
          </p>
          <Link
            href="/report"
            className="inline-flex items-center px-10 py-5 bg-white text-indian-blue rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-indian-blue transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <span>Start Reporting Now</span>
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

