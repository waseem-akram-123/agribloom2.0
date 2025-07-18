"use client";

import Link from "next/link";
import { Mail, PhoneCall, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f8f8] text-green-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-green-800">AgriBloom</h2>
          <p className="text-sm text-gray-700 mb-4">
            AgriBloom provides verified, research-backed farming insights to
            empower Indian farmers and agriculture learners.
          </p>
          <p className="text-xs text-gray-500">
            *This website is built for demonstration and educational purposes only.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-800">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/agrilens" className="hover:underline">
                AgriLens
              </Link>
            </li>
            <li>
              <Link href="/insects" className="hover:underline">
                Insect Management
              </Link>
            </li>
            <li>
              <Link href="/health" className="hover:underline">
                Health Benefits
              </Link>
            </li>
            <li>
              <Link href="/market-rates" className="hover:underline">
                Market Rates
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Used */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-800">
            Resources Used
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✔ Govt. of India Agri Portals</li>
            <li>✔ ICAR (Indian Council of Agricultural Research)</li>
            <li>✔ Krishi Vigyan Kendras (KVKs)</li>
            <li>✔ State Agriculture University Materials</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-800">Contact</h3>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-2" /> support@agribloom.in
          </div>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <PhoneCall className="w-4 h-4 mr-2" /> +91 9876543210
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-2" /> New Delhi, India
          </div>
        </div>
      </div>

      {/* Bottom Strip - darker */}
      <div className="bg-[#2d2d2d] text-center text-sm text-gray-300 py-4 px-6">
        <p>
          © {new Date().getFullYear()} AgriBloom. All rights reserved. | Built
          for demonstration purposes only.
        </p>
        <p className="mt-1">
          Data sourced from certified agricultural bodies including ICAR, KVKs,
          state agri portals, and government resources.
        </p>
      </div>
    </footer>
  );
}
