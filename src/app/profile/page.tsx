"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Pencil } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
        setUser(data.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user && !user.profileCompleted) {
      router.push("/complete-profile");
    }
  }, [user, router]);

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-600 mt-10">Loading your profile...</p>;
  }

  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full flex items-end justify-center relative overflow-hidden">
      <div className="w-full max-w-3xl px-6 pb-24 z-10">
        <Card className="w-full bg-white/90 backdrop-blur-md border border-green-200 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-green-800 text-3xl font-bold text-center">
              Your Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-green-900 text-lg">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Favorite Vegetable:</strong> {user.favoriteVegetable}</p>
            <p><strong>Favorite Fruit:</strong> {user.favoriteFruit}</p>
            <p><strong>Favorite Tree:</strong> {user.favoriteTree}</p>
            <p><strong>Favorite Flower:</strong> {user.favoriteFlower || "N/A"}</p>
            <p><strong>Favorite Season:</strong> {user.favoriteSeason}</p>
            <p><strong>Favorite Activity:</strong> {user.favoriteActivity}</p>

            <div className="flex justify-between pt-6 gap-4">
              <Button
                onClick={() => router.push("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 flex items-center gap-2"
              >
                <Home size={18} />
                Home
              </Button>

              <Button
                onClick={() => router.push("/complete-profile")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 py-2 flex items-center gap-2"
              >
                <Pencil size={18} />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
