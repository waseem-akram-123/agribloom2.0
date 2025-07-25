import type { Metadata } from "next";
import "./globals.css";

import ConditionalNavbar from "./ConditionalNavbar";
import { Toaster } from "react-hot-toast"; // ✅ import this

export const metadata: Metadata = {
  title: "AgriBloom",
  description: "Grow smart with AgriBloom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <ConditionalNavbar />
        <div className="min-h-screen bg-[#F1FAF1]">{children}</div>
        <Toaster position="top-center" reverseOrder={false} /> {/* ✅ add this */}
      </body>
    </html>
  );
}
