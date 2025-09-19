"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const imagePaths = [
  "/nature/hero.jpg",
  "/nature/hero1.jpg",
  "/nature/hero2.jpg",
  "/nature/hero3.jpg",
  "/nature/hero4.jpg",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-[#F1FAF1]">
      {/* Text Column */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 leading-tight">
          {t('hero.title')}
        </h1>

        {/* 🌟 Tagline */}
        <p className="text-xl text-green-700 mt-3 italic font-medium">
          {t('hero.tagline')}
        </p>

        <p className="text-lg text-gray-700 mt-4">
          {t('hero.description')}
        </p>

        <Link href="/agrilens">
          <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
            {t('hero.getStarted')}
          </Button>
        </Link>
      </div>

      {/* Image Column */}
      <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
        <motion.img
          key={imagePaths[currentIndex]} // triggers animation on image change
          src={imagePaths[currentIndex]}
          alt="Farming scene"
          className="w-full rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
