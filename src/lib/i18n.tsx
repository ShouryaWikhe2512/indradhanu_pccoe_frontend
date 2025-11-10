import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation keys
const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'Citizen Report',
    'app.subtitle': 'Powered by Municipality',
    'landing.title': 'Report Civic Issues',
    'landing.description': 'Help improve your community by reporting issues that need attention.',
    'landing.cta': 'Report Issue',
    'report.title': 'Submit Report',
    'report.location': 'Location',
    'report.location.auto': 'Auto-detecting location...',
    'report.location.manual': 'Enter location manually',
    'report.location.lat': 'Latitude',
    'report.location.lon': 'Longitude',
    'report.photos': 'Photos',
    'report.photos.help': 'Share photos (optional) — clear close-up photos help us verify faster.',
    'report.photos.upload': 'Upload Photo',
    'report.category': 'Category',
    'report.category.select': 'Select a category',
    'report.notes': 'Additional Notes',
    'report.notes.placeholder': 'Describe the issue in detail...',
    'report.submit': 'Submit Report',
    'report.submitting': 'Submitting...',
    'result.title': 'Official Assessment',
    'result.is_real': 'Issue Verified',
    'result.is_real.yes': 'Yes',
    'result.is_real.no': 'No',
    'result.confidence': 'Confidence',
    'result.category': 'Category',
    'result.subcategory': 'Subcategory',
    'result.reasoning': 'Reasoning',
    'result.reasoning.expand': 'View Full Reasoning',
    'result.reasoning.collapse': 'Hide Full Reasoning',
    'result.action': 'Recommended Action',
    'result.confirm': 'Confirm Assessment',
    'result.contest': 'Contest Assessment',
    'my_reports.title': 'My Reports',
    'my_reports.empty': 'No reports yet. Submit your first report!',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
  },
  hi: {
    'app.title': 'नागरिक रिपोर्ट',
    'app.subtitle': 'नगर पालिका द्वारा संचालित',
    'landing.title': 'नागरिक मुद्दों की रिपोर्ट करें',
    'landing.description': 'ध्यान देने की आवश्यकता वाले मुद्दों की रिपोर्ट करके अपने समुदाय को बेहतर बनाने में मदद करें।',
    'landing.cta': 'मुद्दा रिपोर्ट करें',
    'report.title': 'रिपोर्ट जमा करें',
    'report.location': 'स्थान',
    'report.location.auto': 'स्थान स्वचालित रूप से पता लगाया जा रहा है...',
    'report.location.manual': 'स्थान मैन्युअल रूप से दर्ज करें',
    'report.location.lat': 'अक्षांश',
    'report.location.lon': 'देशांतर',
    'report.photos': 'तस्वीरें',
    'report.photos.help': 'तस्वीरें साझा करें (वैकल्पिक) — स्पष्ट क्लोज-अप तस्वीरें हमें तेजी से सत्यापित करने में मदद करती हैं।',
    'report.photos.upload': 'तस्वीर अपलोड करें',
    'report.category': 'श्रेणी',
    'report.category.select': 'एक श्रेणी चुनें',
    'report.notes': 'अतिरिक्त नोट्स',
    'report.notes.placeholder': 'मुद्दे का विस्तार से वर्णन करें...',
    'report.submit': 'रिपोर्ट जमा करें',
    'report.submitting': 'जमा किया जा रहा है...',
    'result.title': 'आधिकारिक मूल्यांकन',
    'result.is_real': 'मुद्दा सत्यापित',
    'result.is_real.yes': 'हाँ',
    'result.is_real.no': 'नहीं',
    'result.confidence': 'विश्वास',
    'result.category': 'श्रेणी',
    'result.subcategory': 'उपश्रेणी',
    'result.reasoning': 'तर्क',
    'result.reasoning.expand': 'पूर्ण तर्क देखें',
    'result.reasoning.collapse': 'पूर्ण तर्क छुपाएं',
    'result.action': 'अनुशंसित कार्रवाई',
    'result.confirm': 'मूल्यांकन की पुष्टि करें',
    'result.contest': 'मूल्यांकन पर आपत्ति करें',
    'my_reports.title': 'मेरी रिपोर्टें',
    'my_reports.empty': 'अभी तक कोई रिपोर्ट नहीं। अपनी पहली रिपोर्ट जमा करें!',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'एक त्रुटि हुई',
    'common.retry': 'पुनः प्रयास करें',
    'common.back': 'वापस',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

