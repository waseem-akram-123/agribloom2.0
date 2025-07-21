"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Sprout,
  Apple,
  Leaf,
  Flower,
  TreePine,
  CloudSun,
  Wheat,
} from "lucide-react";
import { toast } from "react-hot-toast";

const seasonOptions = [
  "Spring",
  "Summer",
  "Rainy",
  "Autumn",
  "Winter",
  "Snowy",
];
const activityOptions = [
  "Gardening",
  "Harvesting",
  "Watering Plants",
  "Weeding",
  "Composting",
];

export default function EditProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    favoriteVegetable: "",
    favoriteFruit: "",
    favoriteTree: "",
    favoriteFlower: "",
    favoriteSeason: "",
    favoriteActivity: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/profile");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch user");

        setFormData({
          favoriteVegetable: data.data.favoriteVegetable || "",
          favoriteFruit: data.data.favoriteFruit || "",
          favoriteTree: data.data.favoriteTree || "",
          favoriteFlower: data.data.favoriteFlower || "",
          favoriteSeason: data.data.favoriteSeason || "",
          favoriteActivity: data.data.favoriteActivity || "",
        });
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/users/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("✅ Profile updated successfully!");
      setTimeout(() => router.push("/profile"), 1500);
    } else {
      const error = await res.json();
      toast.error("❌ Failed to update profile: " + error.error);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-12">Loading...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-12">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 py-12 px-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl border border-green-200 bg-white/80 backdrop-blur-lg rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-800 flex items-center justify-center gap-2">
            <Sprout className="text-lime-600" />
            Edit Your AgriBloom Profile
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Update your preferences anytime 🌾
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 px-2 sm:px-4">
            {/* Vegetable */}
            <div>
              <Label className="text-green-700 flex items-center gap-2 mb-1">
                <Leaf className="text-emerald-500" size={16} />
                Favorite Vegetable
              </Label>
              <Input
                name="favoriteVegetable"
                placeholder="e.g. Tomato, Brinjal"
                value={formData.favoriteVegetable}
                onChange={handleChange}
                required
              />
            </div>

            {/* Fruit */}
            <div>
              <Label className="text-green-700 flex items-center gap-2 mb-1">
                <Apple className="text-orange-500" size={16} />
                Favorite Fruit
              </Label>
              <Input
                name="favoriteFruit"
                placeholder="e.g. Mango, Banana"
                value={formData.favoriteFruit}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tree */}
            <div>
              <Label className="text-green-700 flex items-center gap-2 mb-1">
                <TreePine className="text-teal-600" size={16} />
                Favorite Tree
              </Label>
              <Input
                name="favoriteTree"
                placeholder="e.g. Neem, Banyan"
                value={formData.favoriteTree}
                onChange={handleChange}
                required
              />
            </div>

            {/* Flower */}
            <div>
              <Label className="text-green-700 flex items-center gap-2 mb-1">
                <Flower className="text-rose-500" size={16} />
                Favorite Flower{" "}
                <span className="text-gray-500 text-sm">(optional)</span>
              </Label>
              <Input
                name="favoriteFlower"
                placeholder="e.g. Rose, Lotus"
                value={formData.favoriteFlower}
                onChange={handleChange}
              />
            </div>

            {/* Season */}
            <div>
              <Label className="text-green-700 flex items-center gap-2 mb-1">
                <CloudSun className="text-blue-500" size={16} />
                Favorite Season
              </Label>
              <select
                name="favoriteSeason"
                value={formData.favoriteSeason}
                onChange={handleChange}
                required
                className="w-full border mt-1 p-2 rounded-md bg-white text-green-900"
              >
                <option value="">-- Select Season --</option>
                {seasonOptions.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity */}
            <div>
              <Label className="text-green-700 flex items-center gap-2 mb-1">
                <Wheat className="text-yellow-500" size={16} />
                Favorite Activity
              </Label>
              <select
                name="favoriteActivity"
                value={formData.favoriteActivity}
                onChange={handleChange}
                required
                className="w-full border mt-1 p-2 rounded-md bg-white text-green-900"
              >
                <option value="">-- Select Activity --</option>
                {activityOptions.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg rounded-lg mt-4"
            >
              Update Profile
            </Button>

            {/* Cancel Button */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="link"
                onClick={() => router.push("/profile")}
                className="text-green-700 hover:underline text-sm mt-2"
              >
                Cancel and go back →
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
