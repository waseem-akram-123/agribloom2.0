"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface CropEntry {
  _id: string;
  crop: string;
  district: string;
  village: string;
  sowingDate: string;
  area: number;
  season: string;
  farmerId: {
    _id: string;
    username: string;
    email: string;
  };
}

export default function AdminAnalysisPage() {
  const [entries, setEntries] = useState<CropEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/admin/crop-entries");
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this crop entry?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch("/api/admin/crop-entries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Deleted");
        setEntries((prev) => prev.filter((entry) => entry._id !== id));
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        All Crop Entries (Admin View)
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p>No crop entries available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="border px-3 py-2">Crop</th>
                <th className="border px-3 py-2">Farmer</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">District</th>
                <th className="border px-3 py-2">Village</th>
                <th className="border px-3 py-2">Sowing Date</th>
                <th className="border px-3 py-2">Area</th>
                <th className="border px-3 py-2">Season</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id} className="hover:bg-green-50">
                  <td className="border px-3 py-1 capitalize">{entry.crop}</td>
                  <td className="border px-3 py-1">
                    {entry.farmerId.username}
                  </td>
                  <td className="border px-3 py-1">{entry.farmerId.email}</td>
                  <td className="border px-3 py-1">{entry.district}</td>
                  <td className="border px-3 py-1">{entry.village}</td>
                  <td className="border px-3 py-1">
                    {new Date(entry.sowingDate).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-1">{entry.area}</td>
                  <td className="border px-3 py-1 capitalize">
                    {entry.season}
                  </td>
                  <td className="border px-3 py-1 text-center">
                    <button
                      onClick={() => deleteEntry(entry._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
