"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  translateText: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const translateText = async (text: string): Promise<string> => {
    if (selectedLanguage === 'en' || !text) {
      return text;
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          targetLang: selectedLanguage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.translated || text;
      }
    } catch (error) {
      console.error('Translation failed:', error);
    }

    return text;
  };

  // Save language preference to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('agribloom-language');
    if (saved) {
      setSelectedLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('agribloom-language', selectedLanguage);
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, translateText }}>
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
