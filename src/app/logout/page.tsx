"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/users/logout").finally(() => {
      window.location.href = "/";
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging out...</p>
    </div>
  );
}
