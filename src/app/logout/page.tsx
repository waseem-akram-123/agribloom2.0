"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/users/logout").finally(() => {
      window.location.href = "/";
    });
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/nature/logo.jpg"
          alt="Agribloom Logo"
          width={180}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Loading Animation (Leaf Spinner) */}
      <div className="relative mb-6">
        <div className="w-20 h-20 border-t-4 border-green-600 border-opacity-80 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-20 h-20 flex items-center justify-center">
          <div className="rounded-full overflow-hidden w-14 h-14 border-2 border-green-100 shadow-md">
            <Image
              src="/nature/leaf.jpg"
              alt="Loading"
              width={56} // 14 * 4 = 56 (Next.js uses 4x density by default)
              height={56}
              className="w-full h-full object-cover animate-pulse"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <h1 className="text-2xl font-semibold text-green-800 mb-2">
        Logging Out...
      </h1>
      <p className="text-gray-600">You are being securely signed out.</p>

      {/* Footer with Agribloom branding */}
      <footer className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Agribloom. Cultivating Growth Naturally.
      </footer>
    </div>
  );
}
