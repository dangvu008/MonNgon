import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    // Save language preference
    localStorage.setItem('i18nextLng', languageCode);
  };

  return (
    <div className="relative group">
      <button 
        className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Select language"
      >
        <Globe className="h-5 w-5" />
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`
              block w-full text-left px-4 py-2 text-sm
              ${i18n.language === language.code ? 'text-green-600 bg-green-50' : 'text-gray-700'}
              hover:bg-gray-50
            `}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelector;