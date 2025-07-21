"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Leaf, Sprout, Trees, Flower2, Sun, Activity, Pencil, Apple} from "lucide-react";
import { FallingLeaves } from "@/components/ui/Fallingleaves";

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
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-amber-50 flex items-center justify-center">
        <p className="text-center text-green-800 text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-amber-50 relative overflow-hidden">
      <FallingLeaves count={15} />
      
      <div className="w-full max-w-3xl mx-auto px-4 py-16 relative z-10">
        <Card className="w-full bg-white/90 backdrop-blur-sm border border-green-100 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-green-600 py-2 w-full">
            <h2 className="text-white text-center text-xl font-semibold mb-8">AgriBloom Profile</h2>
          </div>
          
          <CardHeader className="pb-0">
            <div className="flex justify-center -mt-12 mb-4">
              <div className="rounded-full bg-white p-2 border-4 border-green-300 shadow-md">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf size={36} className="text-green-600" />
                </div>
              </div>
            </div>
            <CardTitle className="text-green-800 text-2xl font-bold text-center">
              {user.username}'s Garden
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileDetail icon={<Sprout className="text-green-600" />} label="Email" value={user.email} />
              <ProfileDetail icon={<Leaf className="text-green-600" />} label="Favorite Vegetable" value={user.favoriteVegetable} />
              <ProfileDetail icon={<Apple className="text-green-600" />} label="Favorite Fruit" value={user.favoriteFruit} />
              <ProfileDetail icon={<Trees className="text-green-600" />} label="Favorite Tree" value={user.favoriteTree} />
              <ProfileDetail icon={<Flower2 className="text-green-600" />} label="Favorite Flower" value={user.favoriteFlower || "Not set"} />
              <ProfileDetail icon={<Sun className="text-green-600" />} label="Favorite Season" value={user.favoriteSeason} />
              <ProfileDetail icon={<Activity className="text-green-600" />} label="Favorite Activity" value={user.favoriteActivity} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="bg-white text-green-700 border-green-300 hover:bg-green-50 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Home size={18} />
                Back to Home
              </Button>

              <Button
                onClick={() => router.push("/complete-profile")}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Pencil size={18} />
                Edit Garden Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileDetail({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-green-50/50 rounded-lg p-3 border border-green-100">
      <div className="flex items-center gap-2 text-green-800">
        <div className="bg-green-100 p-2 rounded-full">
          {icon}
        </div>
        <div>
          <p className="font-medium text-sm text-green-600">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}