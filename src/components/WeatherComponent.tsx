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
  alert: string[];  // Changed from string to string[] since alert is an array
  location?: string;
}

export default function WeatherComponent() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
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
          setTranslating(true);
          // Ensure data.alert is always treated as an array
          const alerts = Array.isArray(data.alert) ? data.alert : [data.alert];
          const textToTranslate = alerts.join('. ');
          
          console.log('Translating:', textToTranslate); // Debug log
          
          const tRes = await fetch("/api/translate", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({ 
              text: textToTranslate,
              targetLang: "hi" 
            })
          });

          console.log('Translation response status:', tRes.status); // Debug log

          if (!tRes.ok) {
            const errorText = await tRes.text();
            console.error('Translation response:', errorText); // Debug log
            throw new Error(`Translation failed: ${tRes.statusText} (${errorText})`);
          }

          const tData = await tRes.json();
          console.log('Translation data:', tData); // Debug log
          
          if (tData.error) {
            throw new Error(tData.error);
          }
          
          setAlertText(tData.translated || textToTranslate);
          setShowTranslation(true); // Auto-show translation when successful
        } catch (error) {
          console.error('Translation failed:', error);
          // If translation fails, use the original text
          const originalText = Array.isArray(data.alert) ? data.alert.join('. ') : data.alert;
          setAlertText(originalText);
          setShowTranslation(false);
        } finally {
          setTranslating(false);
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
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-yellow-800 mb-2">🚨 Farmer Alert</h3>
              <button
                onClick={toggleTranslation}
                disabled={translating}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  translating 
                    ? 'bg-gray-200 text-gray-500' 
                    : 'bg-yellow-200 hover:bg-yellow-300'
                }`}
              >
                {translating ? "Translating..." : showTranslation ? "Show English" : "हिंदी में देखें"}
              </button>
            </div>
            <p className="text-sm text-yellow-700">
              {translating ? (
                <span className="text-gray-500">Translating...</span>
              ) : showTranslation && alertText ? (
                alertText
              ) : (
                Array.isArray(weather.alert) ? weather.alert.join('. ') : weather.alert
              )}
            </p>
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