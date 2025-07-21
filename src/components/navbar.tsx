"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  LogOut,
  User,
  BookOpen,
  ChevronDown,
  ClipboardList,
  PieChart,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const [showStudyDropdown, setShowStudyDropdown] = useState(false);
  const [showFarmerDropdown, setShowFarmerDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false); // ✅ Admin dropdown

  const [role, setRole] = useState("");

  const studyRef = useRef<HTMLDivElement>(null);
  const farmerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null); // ✅ Admin ref

  useEffect(() => {
    axios
      .get("/api/users/me", {
        headers: {
          "Cache-Control": "no-store",
        },
        withCredentials: true,
      })
      .then((res) => {
        setIsAuthenticated(res.data.authenticated);
        setUsername(res.data.user?.username || "");
        setRole(res.data.user?.role || "");
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        studyRef.current &&
        !studyRef.current.contains(event.target as Node)
      ) {
        setShowStudyDropdown(false);
      }
      if (
        farmerRef.current &&
        !farmerRef.current.contains(event.target as Node)
      ) {
        setShowFarmerDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (
        adminRef.current &&
        !adminRef.current.contains(event.target as Node)
      ) {
        setShowAdminDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const HoveredLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link href={href}>
      <motion.span
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`text-base transition-all font-medium hover:text-green-700 block ${
          pathname === href ? "text-green-600 font-semibold" : "text-gray-700"
        }`}
      >
        {children}
      </motion.span>
    </Link>
  );

  if (loading) return null;

  return (
    <motion.nav
      className="bg-green-50 border-b border-green-200 sticky top-0 z-50 w-full shadow-sm"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col md:flex-row md:items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/nature/logo.jpg"
            alt="AgriBloom Logo"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
          <span className="text-2xl font-bold text-green-800">AgriBloom</span>
        </div>

        {/* Navigation */}
        <div className="mt-4 md:mt-0 md:ml-auto w-full md:w-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 space-y-2 md:space-y-0 text-base">
            <HoveredLink href="/">Home</HoveredLink>

            {isAuthenticated && (
              <>
                <HoveredLink href="/agrilens">AgriLens</HoveredLink>
                <HoveredLink href="/insect">Insect</HoveredLink>
                <HoveredLink href="/healthandbenefits">
                  Health Benefits
                </HoveredLink>
                <HoveredLink href="/contactus">Contact Us</HoveredLink>

                {/* ✅ Admin Dropdown */}
                {role === "admin" && (
                  <div className="relative" ref={adminRef}>
                    <button
                      onClick={() => {
                        setShowAdminDropdown((prev) => !prev);
                        setShowFarmerDropdown(false);
                        setShowStudyDropdown(false);
                      }}
                      className={`flex items-center gap-1 text-base transition-all font-medium cursor-pointer ${
                        pathname.startsWith("/admin")
                          ? "text-green-600 font-semibold"
                          : "text-gray-700"
                      } hover:text-green-700`}
                    >
                      Admin
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          showAdminDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {showAdminDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 bg-white p-3 rounded-lg shadow-xl z-50 min-w-[220px] border border-green-100"
                        >
                          <div className="flex flex-col gap-2">
                            <Link
                              href="/farmer/dashboard"
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                              onClick={() => setShowAdminDropdown(false)}
                            >
                              <div className="bg-green-100 p-2 rounded-full">
                                <PieChart className="h-4 w-4 text-green-600" />
                              </div>
                              <p className="font-medium text-gray-800">
                                Dashboard
                              </p>
                            </Link>

                            <Link
                              href="/farmer/trends"
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                              onClick={() => setShowAdminDropdown(false)}
                            >
                              <div className="bg-green-100 p-2 rounded-full">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              </div>
                              <p className="font-medium text-gray-800">
                                Trends
                              </p>
                            </Link>

                            <Link
                              href="/admin/analysis"
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                              onClick={() => setShowAdminDropdown(false)}
                            >
                              <div className="bg-green-100 p-2 rounded-full">
                                <BarChart3 className="h-4 w-4 text-green-600" />
                              </div>
                              <p className="font-medium text-gray-800">
                                Analysis
                              </p>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Farmer Dropdown */}
                <div className="relative" ref={farmerRef}>
                  <button
                    onClick={() => {
                      setShowFarmerDropdown((prev) => !prev);
                      setShowStudyDropdown(false);
                    }}
                    className={`flex items-center gap-1 text-base transition-all font-medium cursor-pointer ${
                      pathname.startsWith("/farmer")
                        ? "text-green-600 font-semibold"
                        : "text-gray-700"
                    } hover:text-green-700`}
                  >
                    Farmer
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showFarmerDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {showFarmerDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 bg-white p-3 rounded-lg shadow-xl z-50 min-w-[220px] border border-green-100"
                      >
                        <div className="flex flex-col gap-2">
                          <Link
                            href="/farmer/crop-entry"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowFarmerDropdown(false)}
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <ClipboardList className="h-4 w-4 text-green-600" />
                            </div>
                            <p className="font-medium text-gray-800">
                              Crop Entry
                            </p>
                          </Link>
                          <Link
                            href="/farmer/dashboard"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowFarmerDropdown(false)}
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <PieChart className="h-4 w-4 text-green-600" />
                            </div>
                            <p className="font-medium text-gray-800">
                              Dashboard
                            </p>
                          </Link>
                          <Link
                            href="/farmer/trends"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowFarmerDropdown(false)}
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                            <p className="font-medium text-gray-800">Trends</p>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Study Dropdown */}
                <div className="relative" ref={studyRef}>
                  <button
                    onClick={() => {
                      setShowStudyDropdown((prev) => !prev);
                      setShowFarmerDropdown(false);
                    }}
                    className={`flex items-center gap-1 text-base transition-all font-medium cursor-pointer ${
                      pathname.startsWith("/study")
                        ? "text-green-600 font-semibold"
                        : "text-gray-700"
                    } hover:text-green-700`}
                  >
                    Study
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showStudyDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {showStudyDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 bg-white p-3 rounded-lg shadow-xl z-50 min-w-[220px] border border-green-100"
                      >
                        <div className="flex flex-col gap-2">
                          <Link
                            href="/soil"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowStudyDropdown(false)}
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <BookOpen className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                Types of Soils
                              </p>
                              <p className="text-xs text-gray-500">
                                Learn about different soil types
                              </p>
                            </div>
                          </Link>
                          <Link
                            href="/biofertilizers"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowStudyDropdown(false)}
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <BookOpen className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                Biofertilizers
                              </p>
                              <p className="text-xs text-gray-500">
                                Organic fertilizers for your crops
                              </p>
                            </div>
                          </Link>
                          <Link
                            href="/farmingtechniques"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowStudyDropdown(false)}
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <BookOpen className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                Farming Techniques
                              </p>
                              <p className="text-xs text-gray-500">
                                Modern and traditional methods
                              </p>
                            </div>
                          </Link>
                          <Link
                            href="/trees"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowStudyDropdown(false)}
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <BookOpen className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                Medicinal and Poisonous Plants
                              </p>
                              <p className="text-xs text-gray-500">
                                Explore different tree Medicinal trees and
                                poisonous plants
                              </p>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Dropdown */}
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setShowUserDropdown((prev) => !prev)}
                    className={`flex items-center gap-1 text-base transition-all font-medium cursor-pointer ${
                      pathname === "/profile"
                        ? "text-green-600 font-semibold"
                        : "text-gray-700"
                    } hover:text-green-700`}
                  >
                    <span className="truncate max-w-[120px]">
                      {username || "User"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showUserDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 bg-white p-3 rounded-lg shadow-xl z-50 min-w-[240px] border border-green-100"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3 p-2">
                            <div className="bg-green-100 p-2 rounded-full">
                              <User className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {username || "User"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Welcome back!
                              </p>
                            </div>
                          </div>
                          <div className="border-t border-gray-100 my-1"></div>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 transition-colors"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            <div className="bg-blue-100 p-2 rounded-full">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700">
                              Profile Settings
                            </span>
                          </Link>
                          <div className="border-t border-gray-100 my-1"></div>
                          <Link
                            href="/logout"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-red-50 transition-colors"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            <div className="bg-red-100 p-2 rounded-full">
                              <LogOut className="h-4 w-4 text-red-600" />
                            </div>
                            <span className="font-medium text-red-600">
                              Sign Out
                            </span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/signup">Signup</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
