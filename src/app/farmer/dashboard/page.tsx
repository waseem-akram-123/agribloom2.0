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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { percentage, totalArea, averageArea, totalEntries } =
      payload[0].payload;
    return (
      <div className="bg-lime-50 border border-green-500 rounded-md p-2 text-sm shadow-md">
        <p className="font-semibold">{label}</p>
        <p>🌱 % Contribution: {percentage.toFixed(2)}%</p>
        <p>🌾 Total Area: {totalArea.toFixed(2)} acres</p>
        <p>📊 Avg Area: {averageArea.toFixed(2)} acres</p>
        <p>🧾 Entries: {totalEntries}</p>
      </div>
    );
  }
  return null;
};

export default function FarmerDashboardPage() {
  const [cropTrendData, setCropTrendData] = useState<any[]>([]);
  const [topCrop, setTopCrop] = useState("");
  const [district, setDistrict] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserAndTrends = async () => {
      try {
        const userRes = await fetch("/api/users/me");
        const userData = await userRes.json();
        setRole(userData.user?.role || "");
        // console.log("User Role:", userData.role);

        const res = await fetch("/api/farmer/trends");
        const data = await res.json();
        setCropTrendData(data);

        if (data.length > 0) {
          const sorted = [...data].sort((a, b) => b.percentage - a.percentage);
          setTopCrop(sorted[0].crop);
          setDistrict(sorted[0].district);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchUserAndTrends();
  }, []);

  const getHeading = () => {
    if (role === "farmer") {
      return (
        <>
          Crop Trends in Your District {district && <span>({district})</span>}
        </>
      );
    }
    if (role === "admin") {
      return "Crop Trends Across All Districts";
    }
    return "Crop Trends";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {role === "admin" ? "Admin 🧑‍💼" : "Farmer 👨‍🌾"}
      </h1>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">{getHeading()}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cropTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis unit="%" domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#dcfce7" }} />
            <Bar
              dataKey="percentage"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {topCrop && role === "farmer" && (
        <p className="mt-6 text-yellow-800 bg-yellow-100 p-4 rounded-lg shadow-sm">
          ⚠️ <strong>Advisory:</strong> Many farmers are sowing{" "}
          <strong>{topCrop}</strong>. Consider crop rotation to avoid price
          drops.
        </p>
      )}
    </div>
  );
}
