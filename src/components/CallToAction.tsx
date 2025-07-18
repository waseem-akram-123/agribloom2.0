"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

export default function CallToAction() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <section className="bg-green-50 py-16 px-6 md:px-20 text-center text-green-900">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {isAuthenticated
          ? "Continue Growing with AgriBloom 🌱"
          : "Ready to Grow Smarter with AgriBloom?"}
      </motion.h2>

      <p className="text-lg text-green-800 max-w-2xl mx-auto mb-8">
        {isAuthenticated
          ? "Jump back into AgriLens, check market rates, or explore new fertilizer tips curated just for you."
          : "Join thousands of farmers, students, and agri experts who rely on AgriBloom for verified crop guidance and seasonal insights."}
      </p>

      {isAuthenticated ? (
        <Link href="/agrilens">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-5 rounded-full shadow-lg">
            Go to AgriLens
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-5 rounded-full shadow-lg">
            Create Your Free Account
          </Button>
        </Link>
      )}
    </section>
  );
}
