"use client";

import Link from "next/link";
import { Mail, PhoneCall, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Footer() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("/api/users/me")
      .then((res) => {
        setIsAuthenticated(res.data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    console.log(`Language changed to: ${langCode}`);
  };

  return (
    <footer className="bg-[#f8f8f8] text-green-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-green-800">{t('footer.agribloom')}</h2>
          <p className="text-sm text-gray-700 mb-4">
            {t('footer.description')}
          </p>
          <p className="text-xs text-gray-500">
            {t('footer.demoNote')}
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-800">{t('footer.explore')}</h3>
          <ul className="space-y-2 text-sm">
            {isAuthenticated && (
              <>
                <li>
                  <Link href="/agrilens" className="hover:underline">
                    {t('navbar.agrilens')}
                  </Link>
                </li>
                <li>
                  <Link href="/insects" className="hover:underline">
                    {t('navbar.insect')} Management
                  </Link>
                </li>
                <li>
                  <Link href="/health" className="hover:underline">
                    {t('navbar.healthBenefits')}
                  </Link>
                </li>
                <li>
                  <Link href="/mandi-prices" className="hover:underline">
                    {t('navbar.demo')}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Resources Used */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-800">
            {t('footer.resourcesUsed')}
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✔ Govt. of India Agri Portals</li>
            <li>✔ ICAR (Indian Council of Agricultural Research)</li>
            <li>✔ Krishi Vigyan Kendras (KVKs)</li>
            <li>✔ State Agriculture University Materials</li>
          </ul>
        </div>

        {/* Language Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-800 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
{t('footer.language')} / भाषा
          </h3>
          <div className="mb-2 text-xs text-green-600">
            Current: {selectedLanguage.toUpperCase()}
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1 text-sm">
              {languages.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-left hover:bg-green-100 transition-colors ${
                    selectedLanguage === lang.code ? 'bg-green-200 text-green-800' : 'text-gray-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-xs">{lang.name}</span>
                </button>
              ))}
            </div>
            <details className="mt-2">
              <summary className="text-xs text-gray-600 cursor-pointer hover:text-green-700">
                More languages (4 more)
              </summary>
              <div className="grid grid-cols-2 gap-1 text-sm mt-1">
                {languages.slice(6).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded text-left hover:bg-green-100 transition-colors ${
                      selectedLanguage === lang.code ? 'bg-green-200 text-green-800' : 'text-gray-700'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-xs">{lang.name}</span>
                  </button>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-800">{t('footer.contact')}</h3>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-2" /> support@agribloom.in
          </div>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <PhoneCall className="w-4 h-4 mr-2" /> +91 9876543210
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-2" /> New Delhi, India
          </div>
        </div>
      </div>

      {/* Bottom Strip - darker */}
      <div className="bg-[#2d2d2d] text-center text-sm text-gray-300 py-4 px-6">
        <p>
          {t('footer.copyright')}
        </p>
        <p className="mt-1">
          {t('footer.dataSource')}
        </p>
      </div>
    </footer>
  );
}
