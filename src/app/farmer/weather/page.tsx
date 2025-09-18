"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import axios from "axios";

interface WeatherData {
  weather: {
    temp: number;
    humidity: number;
    rain: number;
    condition: string;
  };
  alert: string;
}

export default function WeatherPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<string>("");
  const [alertText, setAlertText] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/users/me");
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          const userRole = response.data.user?.role || "";
          
          // Check if user is a farmer or admin
          if (!["farmer", "admin"].includes(userRole)) {
            router.push("/login?redirect=/farmer/weather");
            return;
          }
        } else {
          router.push("/login?redirect=/farmer/weather");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login?redirect=/farmer/weather");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const getWeatherByIP = async () => {
    setWeatherLoading(true);
    setShowTranslation(false);

    try {
      // First get user's location by IP
      const ipResponse = await fetch("https://ipapi.co/json/");
      const ipData = await ipResponse.json();
      
      const location = `${ipData.city}, ${ipData.region}, ${ipData.country}`;
      setUserLocation(location);

      // Get weather data using coordinates
      const weatherResponse = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          lat: ipData.latitude, 
          lon: ipData.longitude 
        }),
      });

      if (!weatherResponse.ok) {
        throw new Error('Weather fetch failed');
      }

      const data = await weatherResponse.json();
      setWeather(data);

      // Translate the alert into Hindi
      try {
        const tRes = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: data.alert, targetLang: "hi" }),
        });

        if (tRes.ok) {
          const tData = await tRes.json();
          setAlertText(tData.translated);
        }
      } catch (error) {
        console.error('Translation failed:', error);
        setAlertText(data.alert);
      }

    } catch (error) {
      console.error('Weather fetch error:', error);
      alert('Unable to fetch weather data. Please try again.');
    } finally {
      setWeatherLoading(false);
    }
  };

  // Simple emoji-based weather icons
  const getWeatherIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes("rain") || cond.includes("shower")) {
      return "🌧️";
    }
    if (cond.includes("cloud") || cond.includes("overcast")) {
      return "☁️";
    }
    if (cond.includes("sun") || cond.includes("clear")) {
      return "☀️";
    }
    return "☀️"; // default
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

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
            🌤️ {t('weather.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get real-time weather data based on your location with AI-powered farming recommendations
          </p>
        </div>

        {/* Weather Component */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <button
              onClick={getWeatherByIP}
              disabled={weatherLoading}
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold text-lg mb-6"
            >
              {weatherLoading ? t('weather.fetching') : "Get Weather by IP Location"}
            </button>

            {userLocation && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📍 Your Location:</h3>
                <p className="text-blue-700">{userLocation}</p>
              </div>
            )}

            {weather && (
              <div className="space-y-6">
                {/* Weather Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl mb-2">{getWeatherIcon(weather.weather.condition)}</div>
                    <div className="text-2xl font-bold text-gray-800">{weather.weather.temp}°C</div>
                    <div className="text-sm text-gray-600 capitalize">{weather.weather.condition}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">💧 {t('weather.humidity')}</span>
                      <span className="font-semibold">{weather.weather.humidity}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">🌧️ {t('weather.rain')}</span>
                      <span className="font-semibold">{weather.weather.rain}mm</span>
                    </div>
                  </div>
                </div>

                {/* Farmer Alert */}
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-yellow-800">🚨 {t('mandi.farmerAdvice')}</h3>
                    <button
                      onClick={toggleTranslation}
                      className="text-xs bg-yellow-200 hover:bg-yellow-300 px-2 py-1 rounded transition-colors"
                    >
                      {showTranslation ? "English" : "हिंदी"}
                    </button>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    {showTranslation && alertText ? alertText : weather.alert}
                  </p>
                </div>
              </div>
            )}

            {!weather && !weatherLoading && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🌤️</div>
                <p>{t('weather.noWeather')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
