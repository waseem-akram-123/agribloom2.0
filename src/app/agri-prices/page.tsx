"use client";

import { useState } from "react";
import axios from "axios";

export default function AgriPrices() {
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const capitalize = (str: string) =>
    str.replace(/\b\w/g, (c) => c.toUpperCase());

  const fetchPrices = async () => {
    setError("");
    setData(null);

    try {
      const res = await axios.get("/api/users/get-crops-prices", {
        params: {
          crop: crop.toUpperCase(),
          state: state.toUpperCase(),
          district,
        },
      });
      setData(res.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unknown error"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-green-800">
        Crop Market Price Checker
      </h1>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Crop (e.g., Banana)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="State (e.g., Karnataka)"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="District (e.g., Kalaburgi)"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={fetchPrices}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Get Prices
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data?.prices?.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Prices for {capitalize(crop)} ({capitalize(district)},{" "}
            {capitalize(state)})
          </h2>
          {data.prices.map((item: any, i: number) => (
            <div
              key={i}
              className="p-4 border border-gray-300 rounded bg-gray-50"
            >
              <p className="font-bold">{item.mandi}</p>
              <p>Date: {item.date}</p>
              <p>
                Min: ₹{item.minPrice} | Max: ₹{item.maxPrice} | Modal: ₹
                {item.modalPrice}
              </p>
            </div>
          ))}
        </div>
      )}

      {!error && data?.stale && (
        <p className="mt-4 text-yellow-600 italic">
          ⚠️ No recent data available. This mandi may be inactive or hasn’t
          traded this crop recently.
        </p>
      )}
    </div>
  );
}
