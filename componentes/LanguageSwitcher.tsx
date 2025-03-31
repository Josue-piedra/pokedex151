// components/LanguageSwitcher.tsx

'use client';

import { useRouter } from 'next/router';  // To access router for language switching
import { useTranslation } from 'react-i18next';  // Import useTranslation hook

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();  // Access the i18n instance to change languages
  const router = useRouter();  // Use the Next.js router to reload the page after language switch

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);  // Change the language using next-i18next
    router.push(router.asPath);  // Re-load the current page after changing language
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleLanguageChange('en')}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('es')}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
      >
        Español
      </button>
    </div>
  );
};

export default LanguageSwitcher;
