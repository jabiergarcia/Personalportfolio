import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Language } from '../translations';
import type { TranslationKeys } from '../translations/es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Detect browser language on first load
  const getInitialLanguage = (): Language => {
    // Check localStorage first
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && (saved === 'es' || saved === 'en')) {
      return saved;
    }

    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    
    // Spanish variations
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    
    // Default to English for everything else
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Save to localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update html lang attribute for accessibility
    document.documentElement.lang = lang;
    
    console.log(`🌍 [Language] Changed to: ${lang.toUpperCase()}`);
  };

  // Set initial html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
