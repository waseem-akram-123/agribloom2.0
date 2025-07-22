"use client";

import React, { useState, useEffect } from "react";
// Force reload if token cookie is missing (helps with Edge cookie sync after login)
useEffect(() => {
  if (typeof window !== "undefined" && !document.cookie.includes("token=")) {
    window.location.reload();
  }
}, []);
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Image from "next/image";
import cropDataRaw from "@/data/agrilens.json";
import { motion, AnimatePresence } from "framer-motion";

interface Crop {
  id: number;
  commonName: string;
  scientificName: string;
  season: string;
  sowingMonth: string;
  floweringPeriod: string;
  harvestingMonth: string;
  waterRequirementPerDayLiters: string;
  sunlightRequirement: string;
  soilType: string;
  image: string;
}

const cropData: Crop[] = cropDataRaw;

const seasonInfo = [
  {
    name: "Kharif Season",
    time: "June to October (monsoon)",
    sowing: "Beginning of the monsoon (June-July)",
    harvesting: "September to October",
  },
  {
    name: "Rabi Season",
    time: "October to March (winter)",
    sowing: "After the monsoon (October-November)",
    harvesting: "March to April",
  },
  {
    name: "Zaid Season",
    time: "March to June (summer)",
    description: "Shorter season between rabi and kharif",
  },
];

const sunlightInfo = [
  {
    name: "Full Sun",
    emoji: "🌞",
    definition: "At least 6–8 hours of direct sunlight daily.",
  },
  {
    name: "Partial Sun / Partial Shade",
    emoji: "⛅",
    definition:
      "3–6 hours of direct sunlight, often filtered or with shade during part of the day.",
    details:
      "Partial sun: Slightly more light, prefers morning sun\nPartial shade: Slightly less light, protected from harsh afternoon sun",
  },
  {
    name: "Dappled Sunlight / Filtered Light",
    emoji: "☁",
    definition:
      "Sunlight that comes through tree leaves or netting – not direct.",
  },
  {
    name: "Full Shade",
    emoji: "🌑",
    definition:
      "Less than 3 hours of direct sunlight; mostly indirect or reflected light.",
  },
];

export default function AgriLensPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setError(null);

    if (!term.trim()) {
      setSelectedCrop(null);
      return;
    }

    const normalizedTerm = term.toLowerCase().replace(/[()]/g, "").trim();

    const crop = cropData.find((item) => {
      const commonName = item.commonName.toLowerCase().replace(/[()]/g, "");
      return commonName.includes(normalizedTerm);
    });

    if (crop) {
      setSelectedCrop(crop);
    } else {
      setSelectedCrop(null);
      setError("This crop data is not available.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          AgriLens Crop Search
        </h1>
        <p className="text-lg text-gray-600">
          Discover detailed information about various crops
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto mb-16 relative"
      >
        <Label htmlFor="crop-search" className="sr-only">
          Search Crop
        </Label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="crop-search"
            type="text"
            placeholder="Search for a crop (e.g., Eggplant, Wheat, Tomato)"
            className="pl-12 py-6 text-lg border-2 border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-transparent shadow-sm hover:border-gray-300 transition-all"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-red-500 font-medium text-lg mb-8"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCrop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <Image
                  src="/nature/default.jpg"
                  alt={selectedCrop.commonName}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      🌿 {selectedCrop.commonName}
                    </h2>
                    <p className="text-gray-200 italic">
                      {selectedCrop.scientificName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="md:w-2/3 p-8 md:p-10">
                {/* Crop Name Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-green-700">
                    {selectedCrop.commonName}
                  </h2>
                  <p className="text-lg text-gray-600 italic">
                    {selectedCrop.scientificName}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-green-50 rounded-xl"
                  >
                    <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        🌱
                      </span>
                      Growth Info
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Season:</span>{" "}
                        {selectedCrop.season}
                      </li>
                      <li>
                        <span className="font-medium">Sowing Month:</span>{" "}
                        {selectedCrop.sowingMonth}
                      </li>
                      <li>
                        <span className="font-medium">Flowering Period:</span>{" "}
                        {selectedCrop.floweringPeriod}
                      </li>
                      <li>
                        <span className="font-medium">Harvesting Month:</span>{" "}
                        {selectedCrop.harvestingMonth}
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 bg-amber-50 rounded-xl"
                  >
                    <h3 className="font-semibold text-amber-700 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                        💧
                      </span>
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Water:</span>{" "}
                        {selectedCrop.waterRequirementPerDayLiters}
                      </li>
                      <li>
                        <span className="font-medium">Sunlight:</span>{" "}
                        {selectedCrop.sunlightRequirement}
                      </li>
                      <li>
                        <span className="font-medium">Soil Type:</span>{" "}
                        {selectedCrop.soilType}
                      </li>
                    </ul>
                  </motion.div>
                </div>

                {/* Agricultural Information Sections */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 bg-blue-50 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                      <span className="mr-2">🌾</span>
                      Indian Crop Seasons
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {seasonInfo.map((season, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-sm"
                        >
                          <h4 className="font-semibold text-green-700 mb-2">
                            {season.name}
                          </h4>
                          <ul className="text-sm space-y-1">
                            <li>⏱️ Time: {season.time}</li>
                            <li>🌱 Sowing: {season.sowing}</li>
                            <li>🔄 Harvesting: {season.harvesting}</li>
                            {season.description && (
                              <li>📝 {season.description}</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 bg-purple-50 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                      <span className="mr-2">☀️</span>
                      Sunlight Requirements Guide
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sunlightInfo.map((light, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-sm"
                        >
                          <h4 className="font-semibold flex items-center">
                            <span className="mr-2">{light.emoji}</span>
                            {light.name}
                          </h4>
                          <p className="text-sm mt-2">{light.definition}</p>
                          {light.details && (
                            <p className="text-xs mt-2 whitespace-pre-line text-gray-600">
                              {light.details}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedCrop && !error && searchTerm === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-block p-6 bg-green-50 rounded-2xl mb-6">
            <Search className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-2xl font-medium text-gray-700 mb-2">
            Search for a crop
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter the name of a crop to discover detailed information about its
            growing conditions, requirements, and more.
          </p>
        </motion.div>
      )}
    </div>
  );
}
