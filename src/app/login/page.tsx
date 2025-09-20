"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);

      toast.success(res.data.message || "Login successful");

      // Redirect based on profile status
      const profileCompleted = res.data.profileCompleted;

      if (profileCompleted) {
        router.push(redirect);
      } else {
        router.push("/complete-profile");
      }
    } catch (error: unknown) {
      let msg = "Login failed";
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
        msg = (error.response.data as { message?: string }).message || msg;
      }
      if (msg === "User doesn’t exist, please sign up") {
        toast.error("User doesn’t exist, please sign up.");
      } else if (msg === "Invalid credentials") {
        toast.error("Incorrect email or password.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center relative overflow-hidden">
      {/* Left swaying sprout */}
      <motion.div
        className="absolute left-4 bottom-4"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Sprout className="text-green-700 w-10 h-10" />
      </motion.div>

      {/* Right swaying sprout */}
      <motion.div
        className="absolute right-4 bottom-4"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Sprout className="text-green-700 w-10 h-10" />
      </motion.div>

      <Card className="w-full max-w-md border-green-300 border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-700">
            🌱 Welcome Back to AgriBloom
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Log in to continue growing!
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="you@agribloom.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={buttonDisabled || loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don’t have an account?
            </span>{" "}
            <Link
              href="/signup"
              className="text-green-700 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌾</div>
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
