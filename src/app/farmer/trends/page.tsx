"use client";

import { useEffect, useState } from "react";

interface Trend {
  crop: string;
  totalEntries: number;
  totalArea: number;
  averageArea: number;
  percentage: number;
}

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch("/api/farmer/trends");
        const data = await res.json();
        setTrends(data);
      } catch (err) {
        console.error("Failed to load trends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-green-800">Crop Sowing Trends</h1>
      {loading ? (
        <p className="text-gray-500">Loading trends...</p>
      ) : trends.length === 0 ? (
        <p className="text-gray-600">No trends data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="border rounded-xl shadow p-4 bg-green-50 hover:bg-green-100 transition"
            >
              <h2 className="text-lg font-bold capitalize">{trend.crop}</h2>
              <p>Total Entries: {trend.totalEntries}</p>
              <p>Total Area: {trend.totalArea} acres</p>
              <p>Average Area: {trend.averageArea} acres</p>
              <p>Contribution: {trend.percentage}% of total sown area</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
