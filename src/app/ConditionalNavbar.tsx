"use client";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const hideOnPaths = [
    "/login",
    "/signup",
    "/verifyemail",
    "/complete-profile",
    "/profile" // 👈 Add this!
  ];
  if (hideOnPaths.includes(pathname)) return null;
  return <Navbar />;
}
