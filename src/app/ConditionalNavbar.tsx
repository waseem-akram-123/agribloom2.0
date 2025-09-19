"use client";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  const hideOnPaths = [
    "/login",
    "/signup",
    "/verifyemail",
    "/complete-profile",
    "/profile"
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  if (hideOnPaths.includes(pathname)) return null;
  return <Navbar />;
}
