import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex justify-center space-x-4 mt-6">
            <button
                onClick={() => handleLanguageChange('en')}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg"
            >
                English
            </button>
            <button
                onClick={() => handleLanguageChange('es')}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg"
            >
                Español
            </button>
        </div>
    );
};

export default LanguageSwitcher;