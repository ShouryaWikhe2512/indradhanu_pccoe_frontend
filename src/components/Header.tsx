import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Header() {
  const { language, setLanguage, t } = useI18n();

  return (
    <header className="w-full bg-white shadow-md border-b-4 border-saffron">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-saffron"></div>
              <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-green"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {t('app.title')}
              </h1>
              <p className="text-xs text-gray-600">{t('app.subtitle')}</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="/my-reports"
              className="text-sm font-medium text-gray-700 hover:text-saffron transition-colors focus:outline-none focus:ring-2 focus:ring-saffron rounded px-2 py-1"
            >
              My Reports
            </Link>
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-saffron transition-colors"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

