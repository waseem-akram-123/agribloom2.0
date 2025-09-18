"use client";

import { useState } from "react";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
}

export default function WeatherPage() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      const res = await fetch(`/api/weather?location=${location}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🌾 Farmer Weather Dashboard</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter district or city"
        className="p-2 border rounded mb-4 w-80"
      />
      <button
        onClick={getWeather}
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
      >
        Get Weather
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 bg-white shadow-lg p-6 rounded w-80">
          <h2 className="text-xl font-semibold">{weather.location}</h2>
          <p>🌡 Temperature: {weather.temperature} °C</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌧 Rainfall: {weather.rainfall} mm</p>
          <p>🌬 Wind Speed: {weather.windSpeed} m/s</p>
          <p>☁ Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}
