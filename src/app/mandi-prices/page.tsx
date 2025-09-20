"use client";
import MandiPricesComponent from "@/components/MandiPricesComponent";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import axios from "axios";

export default function MandiPricesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/users/me");
        if (response.data.authenticated) {
          const role = response.data.user?.role || "";
          
          // Check if user is a farmer or admin
          if (!["farmer", "admin"].includes(role)) {
            router.push("/login?redirect=/mandi-prices");
            return;
          }
          
          setIsAuthenticated(true);
        } else {
          router.push("/login?redirect=/mandi-prices");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login?redirect=/mandi-prices");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]); // Remove userRole dependency

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌾</div>
          <div className="text-xl text-gray-600">{t('common.loading')}...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🛒 {t('mandi.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('demo.subtitle')}
          </p>
        </div>

        {/* Mandi Prices Component */}
        <div className="max-w-4xl mx-auto">
          <MandiPricesComponent />
        </div>

        {/* Features List */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-8">
            ✨ {t('demo.howItWorks')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-4">🌍</div>
              <h4 className="font-bold text-green-700 mb-2">GPS Location</h4>
              <p className="text-gray-600 text-sm">
                {t('demo.weatherDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-4">🔔</div>
              <h4 className="font-bold text-green-700 mb-2">Smart Alerts</h4>
              <p className="text-gray-600 text-sm">
                {t('demo.weatherDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-4">💰</div>
              <h4 className="font-bold text-green-700 mb-2">Price Intelligence</h4>
              <p className="text-gray-600 text-sm">
                {t('demo.marketDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-4">🌐</div>
              <h4 className="font-bold text-green-700 mb-2">Multilingual</h4>
              <p className="text-gray-600 text-sm">
                {t('demo.multilingualDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-4">📊</div>
              <h4 className="font-bold text-green-700 mb-2">Real-time Data</h4>
              <p className="text-gray-600 text-sm">
                {t('demo.dataDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="font-bold text-green-700 mb-2">Farmer-Focused</h4>
              <p className="text-gray-600 text-sm">
                {t('demo.dataDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-6">
            🚀 {t('demo.howItWorks')}
          </h3>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">1</span>
              <p><strong>{t('demo.weatherTitle')}:</strong> {t('demo.weatherDesc')}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">2</span>
              <p><strong>{t('demo.multilingualTitle')}:</strong> {t('demo.multilingualDesc')}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">3</span>
              <p><strong>{t('demo.marketTitle')}:</strong> {t('demo.marketDesc')}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">4</span>
              <p><strong>{t('demo.dataTitle')}:</strong> {t('demo.dataDesc')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>{t('demo.footerText')}</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
