"use client";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface WeatherData {
  weather: {
    temp: number;
    humidity: number;
    rain: number;
    condition: string;
  };
  alert: string;
}

export default function WeatherComponent() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [alertText, setAlertText] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);

  const getWeather = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setShowTranslation(false);

    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch("/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lon }),
        });

        if (!res.ok) {
          throw new Error('Weather fetch failed');
        }

        const data = await res.json();
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

        setLoading(false);
      }, (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
        alert('Unable to get your location. Please allow location access.');
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
      setLoading(false);
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

  return (
    <div className="p-6 border rounded-xl shadow-lg max-w-md mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">🌾 {t('weather.title')}</h2>
      
      <button
        onClick={getWeather}
        disabled={loading}
        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold"
      >
{loading ? t('weather.fetching') : t('weather.getWeather')}
      </button>

      {weather && (
        <div className="mt-6 space-y-4">
          {/* Weather Icon */}
          <div className="flex justify-center text-6xl">
            {getWeatherIcon(weather.weather.condition)}
          </div>
          
          {/* Weather Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-xl">🌡️</span>
<span className="font-medium">{t('weather.temp')}:</span>
              </div>
              <span className="font-bold text-lg">{weather.weather.temp}°C</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-xl">💧</span>
<span className="font-medium">{t('weather.humidity')}:</span>
              </div>
              <span className="font-bold text-lg">{weather.weather.humidity}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-xl">🌧️</span>
<span className="font-medium">{t('weather.rain')}:</span>
              </div>
              <span className="font-bold text-lg">{weather.weather.rain} mm</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xl">☁️</span>
<span className="font-medium">{t('weather.condition')}:</span>
              </div>
              <span className="font-medium capitalize">{weather.weather.condition}</span>
            </div>
          </div>

          {/* Farmer Alert */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2">🚨 Farmer Alert</h3>
            <p className="text-sm text-yellow-700">
              {showTranslation && alertText ? alertText : weather.alert}
            </p>
            {alertText && (
              <button
                onClick={toggleTranslation}
                className="mt-2 text-xs bg-yellow-200 hover:bg-yellow-300 px-3 py-1 rounded transition-colors"
              >
                {showTranslation ? "Show English" : "हिंदी में देखें"}
              </button>
            )}
          </div>
        </div>
      )}

      {!weather && !loading && (
        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">
            Click the button above to get real-time weather data for your location.
          </p>
        </div>
      )}
    </div>
  );
}