"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import translations from "@/data/translations.json";

type TranslationKey = keyof typeof translations.en;

export function useTranslation() {
  const { selectedLanguage } = useLanguage();
  const [translationCache, setTranslationCache] = useState<Record<string, string>>({});

  // Get static translation from JSON file
  const getStaticTranslation = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[selectedLanguage as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || translations.en[key as keyof typeof translations.en] || key;
  };

  // Get dynamic translation using Google Translate API
  const getDynamicTranslation = async (text: string): Promise<string> => {
    if (selectedLanguage === 'en' || !text) {
      return text;
    }

    // Check cache first
    const cacheKey = `${selectedLanguage}:${text}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
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
        const translated = data.translated || text;
        
        // Cache the translation
        setTranslationCache(prev => ({
          ...prev,
          [cacheKey]: translated
        }));
        
        return translated;
      }
    } catch (error) {
      console.error('Translation failed:', error);
    }

    return text;
  };

  // Main translation function
  const t = (key: string): string => {
    return getStaticTranslation(key);
  };

  // Dynamic translation function
  const translate = async (text: string): Promise<string> => {
    return await getDynamicTranslation(text);
  };

  return {
    t,
    translate,
    language: selectedLanguage
  };
}
