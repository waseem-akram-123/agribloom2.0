"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

export default function FarmerDashboardPage() {
  const [cropTrendData, setCropTrendData] = useState([]);
  const [topCrop, setTopCrop] = useState("");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch("/api/farmer/trends");
        const data = await res.json();
        setCropTrendData(data);
        if (data.length > 0) setTopCrop(data[0].crop);
      } catch (err) {
        console.error("Failed to fetch crop trends", err);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome, Farmer 👨‍🌾</h1>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Crop Trends in Your District</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cropTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis unit="%" />
            <Tooltip />
            <Bar dataKey="percentage" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {topCrop && (
        <p className="mt-6 text-yellow-800 bg-yellow-100 p-4 rounded-lg shadow-sm">
          ⚠️ <strong>Advisory:</strong> Many farmers are sowing{" "}
          <strong>{topCrop}</strong>. Consider crop rotation to avoid price drops.
        </p>
      )}
    </div>
  );
}
