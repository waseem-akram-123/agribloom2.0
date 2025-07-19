"use client";

import { useState, useEffect } from "react";

export default function CropEntryPage() {
  const [form, setForm] = useState({
    crop: "",
    district: "",
    village: "",
    sowingDate: "",
    area: 0,
    season: "kharif",
  });

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();

        if (res.ok && data.user?.id) {
          setUserId(data.user.id);
        } else {
          console.error("Failed to fetch user ID");
        }
      } catch (err) {
        console.error("Error fetching user ID", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "area" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { crop, district, village, sowingDate, area, season } = form;
    if (!crop || !district || !village || !sowingDate || area <= 0) {
      alert("⚠️ Please fill in all fields correctly.");
      return;
    }

    if (!userId) {
      alert("❌ Cannot submit: user ID not found.");
      return;
    }

    try {
      const res = await fetch("/api/farmer/crop-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop,
          district,
          village,
          sowingDate,
          area,
          season,
          farmerId: userId, // ✅ Use fetched user ID (admin or farmer)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ Error: " + (data.message || "Something went wrong."));
        return;
      }

      alert("✅ Crop entry submitted successfully!");
      setForm({
        crop: "",
        district: "",
        village: "",
        sowingDate: "",
        area: 0,
        season: "kharif",
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert("❌ Network or server error.");
    }
  };

  return (
    <div className="pt-20 bg-green-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-4">Enter Crop Details</h2>

        <input
          name="crop"
          placeholder="Crop Name"
          value={form.crop}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="district"
          placeholder="District"
          value={form.district}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="village"
          placeholder="Village"
          value={form.village}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="date"
          name="sowingDate"
          value={form.sowingDate}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="number"
          name="area"
          placeholder="Area in acres"
          value={form.area}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <select
          name="season"
          value={form.season}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="kharif">Kharif</option>
          <option value="rabi">Rabi</option>
          <option value="zaid">Zaid</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
