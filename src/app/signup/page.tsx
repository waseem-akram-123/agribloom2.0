"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/users/signup", user);
      toast.success(response.data.message || "Signup successful.");
      router.push("/login");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Signup failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { username, email, password } = user;
    setButtonDisabled(!(username && email && password));
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center relative overflow-hidden">
      {/* Decorative plants */}
      <motion.div
        className="absolute left-4 bottom-4"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <Sprout className="text-green-700 w-10 h-10" />
      </motion.div>
      <motion.div
        className="absolute right-4 bottom-4"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <Sprout className="text-green-700 w-10 h-10" />
      </motion.div>

      <Card className="w-full max-w-md shadow-lg border-green-300 border-2">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-700">
            🌱 Welcome to AgriBloom
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Create your account to start growing with us.
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSignup();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="you@agribloom.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full p-2 border rounded"
                value={user.role}
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value })
                }
              >
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={buttonDisabled || loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? "Signing up..." : "Signup"}
            </Button>

            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>{" "}
            <Link
              href="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
