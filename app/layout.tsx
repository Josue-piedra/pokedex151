// Layout.tsx
import React from 'react';  // Only import React itself
import './globals.css';
import Link from 'next/link';
import './i18n'; // Make sure your i18next config is imported
import { useTranslation } from 'react-i18next'; // Import hook for translations

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation(); // Use the hook for translations and language access

  // Function to change the language
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <html lang={i18n.language}> {/* Dynamically set language based on current selection */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={t('description')} />
        <title>{t('title')}</title>
      </head>
      <body className="bg-gray-900 text-gray-300 min-h-screen flex flex-col">
        <header className="p-6 bg-gray-800 text-white text-center shadow-md flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            {/* Image located in 'public/images/1033032.png' */}
            <img src="/images/1033032.png" alt={t('title')} className="w-12 h-12" />
            <h1 className="text-4xl font-bold tracking-wider uppercase">{t('title')}</h1>
          </Link>
          
          {/* Language Switcher (switch languages) */}
          <div>
            <button onClick={() => changeLanguage('en')} className="text-white hover:underline">
              {t('enLanguage')}
            </button>
            <span className="mx-2">|</span>
            <button onClick={() => changeLanguage('es')} className="text-white hover:underline">
              {t('esLanguage')}
            </button>
          </div>
        </header>

        {/* Main Content with Tailwind Styles for Responsiveness */}
        <main className="flex-1 container mx-auto p-6">{children}</main>

        {/* Footer with Links to PokéAPI and GitHub */}
        <footer className="p-6 bg-gray-800 text-white text-center">
          <p className="text-sm">© {new Date().getFullYear()} Pokedex Kanto</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link href="https://pokeapi.co/" target="_blank" className="hover:underline">PokéAPI</Link>
            <Link href="https://github.com/" target="_blank" className="hover:underline">GitHub</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
