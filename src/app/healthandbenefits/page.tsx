"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, HeartPulse, Clock, Nut, Apple, Carrot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import cropDataRaw from "@/data/healthandbenifits.json";

interface HealthBenefits {
  benefit1: string;
  benefit2: string;
  benefit3: string;
}

interface Crop {
  id: number;
  commonName: string;
  scientificName: string;
  healthBenefits?: HealthBenefits;
  carbohydrates?: number;
  proteins?: number;
  fats?: number;
  vitamins?: string[];
  minerals?: string[];
  bestTimeToConsume?: string;
  shelfLife?: string;
}

const cropData: Crop[] = cropDataRaw as Crop[];
const timeSlots = [
  {
    period: "Morning",
    time: "6:00 AM – 9:00 AM",
    description: "Ideal for detoxifying, vitamin-rich fruits, light carbs",
  },
  {
    period: "Mid-Morning",
    time: "9:00 AM – 11:00 AM",
    description: "Best for fruits, nuts, energy-boosting foods",
  },
  {
    period: "Lunch",
    time: "12:00 PM – 2:00 PM",
    description: "Heavier foods, high in protein, complex carbs",
  },
  {
    period: "Afternoon",
    time: "2:00 PM – 5:00 PM",
    description: "Hydrating fruits, digestion-aiding items",
  },
  {
    period: "Evening",
    time: "5:00 PM – 7:00 PM",
    description: "Light veggies, low-fat, antioxidant foods",
  },
  {
    period: "Night",
    time: "7:00 PM – 9:00 PM",
    description: "Easily digestible, calming foods",
  },
  {
    period: "Midnight",
    time: "12:00 AM – 2:00 AM",
    description: "Rarely suggested unless for herbs or medical use",
  },
  {
    period: "After Meals",
    time: "15–30 minutes after eating",
    description: "Usually for herbs like fennel, cardamom, etc.",
  },
];

export default function HealthBenefitsPage() {
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
      setError("This crop's health data is not available.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header without images */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-12"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
            <HeartPulse className="inline mr-3" size={40} />
            Crop Health & Nutrition
          </h1>
          <p className="text-lg text-gray-600">
            Discover the health benefits and nutritional values of crops
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto mb-16 relative"
      >
        <Label htmlFor="health-search" className="sr-only">
          Search Crop
        </Label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="health-search"
            type="text"
            placeholder="Search for a crop (e.g., Pear, Mango, Spinach)"
            className="pl-12 py-6 text-lg border-2 border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:border-transparent shadow-sm hover:border-gray-300 transition-all"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {selectedCrop ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 p-8"
              >
                {/* Crop Name Header */}
                <div className="mb-8 text-center">
                  <h2 className="text-4xl font-bold text-rose-600">
                    {selectedCrop.commonName}
                  </h2>
                  <p className="text-xl text-gray-600 italic">
                    {selectedCrop.scientificName}
                  </p>
                </div>

                {/* Health Benefits - Enhanced Container */}
                {selectedCrop.healthBenefits && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 bg-gradient-to-r from-rose-50 to-amber-50 p-6 rounded-xl border border-rose-100"
                  >
                    <h3 className="text-2xl font-bold text-rose-700 mb-4 flex items-center justify-center">
                      <HeartPulse className="mr-2" size={24} />
                      Health Benefits of {selectedCrop.commonName}
                    </h3>
                    <ul className="space-y-4">
                      {Object.values(selectedCrop.healthBenefits).map(
                        (benefit, index) => (
                          <li key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                            <span className="text-green-500 mr-3 text-xl">✓</span>
                            <span className="text-lg">{benefit}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {/* Nutritional Values */}
                {(selectedCrop.carbohydrates ||
                  selectedCrop.proteins ||
                  selectedCrop.fats) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold text-amber-600 mb-4 flex items-center">
                      <Nut className="mr-2" size={24} />
                      Nutritional Values (per 100g)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCrop.carbohydrates !== undefined && (
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <p className="font-semibold text-amber-700">
                            Carbohydrates
                          </p>
                          <p className="text-2xl font-bold">
                            {selectedCrop.carbohydrates}g
                          </p>
                        </div>
                      )}
                      {selectedCrop.proteins !== undefined && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="font-semibold text-blue-700">
                            Proteins
                          </p>
                          <p className="text-2xl font-bold">
                            {selectedCrop.proteins}g
                          </p>
                        </div>
                      )}
                      {selectedCrop.fats !== undefined && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="font-semibold text-green-700">
                            Fats
                          </p>
                          <p className="text-2xl font-bold">
                            {selectedCrop.fats}g
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">
                      Values are given in grams (g) per 100 grams of edible
                      portion. This is the standard format used in official
                      Indian nutrition data (NIN, ICMR) and global sources
                      like USDA.
                    </p>
                  </motion.div>
                )}

                {/* Best Time to Consume and Shelf Life */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Best Time to Consume */}
                  {selectedCrop.bestTimeToConsume && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white p-6 rounded-xl border border-green-100 shadow-sm"
                    >
                      <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center">
                        <Clock className="mr-2" size={20} />
                        Best Time to Consume
                      </h3>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedCrop.bestTimeToConsume}
                        </span>
                        <p className="ml-3 text-gray-600 text-sm">
                          {timeSlots.find(t => t.period === selectedCrop.bestTimeToConsume)?.description}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Shelf Life */}
                  {selectedCrop.shelfLife && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm"
                    >
                      <h3 className="text-xl font-bold text-amber-700 mb-3 flex items-center">
                        <Apple className="mr-2" size={20} />
                        Shelf Life
                      </h3>
                      <div className="flex items-center">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedCrop.shelfLife}
                        </span>
                        <p className="ml-3 text-gray-600 text-sm">
                          When stored properly at room temperature or refrigerated
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Vitamins and Minerals */}
                {(selectedCrop.vitamins || selectedCrop.minerals) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100"
                  >
                    <h3 className="text-2xl font-bold text-blue-700 mb-4">
                      Rich in Essential Nutrients
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Vitamins */}
                      {selectedCrop.vitamins && (
                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2">Vitamins</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCrop.vitamins.map((vitamin, index) => (
                              <span
                                key={index}
                                className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-blue-100"
                              >
                                {vitamin}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Minerals */}
                      {selectedCrop.minerals && (
                        <div>
                          <h4 className="font-semibold text-cyan-600 mb-2">Minerals</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCrop.minerals.map((mineral, index) => (
                              <span
                                key={index}
                                className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-cyan-100"
                              >
                                {mineral}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl shadow-xl"
              >
                <div className="inline-block p-6 bg-rose-50 rounded-2xl mb-6">
                  <Search className="h-12 w-12 text-rose-500" />
                </div>
                <h3 className="text-2xl font-medium text-gray-700 mb-2">
                  Search for a crop
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Enter the name of a crop to discover its health benefits and
                  nutritional information.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Column - Always visible */}
        <div className="space-y-8">
          {/* Optimal Consumption Times */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-rose-600 mb-4 flex items-center">
              <Clock className="mr-2" size={24} />
              Details of Consumption Times
            </h3>
            <div className="space-y-4">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="border-l-4 border-rose-200 pl-4 py-1"
                >
                  <p className="font-semibold text-gray-800">{slot.period}</p>
                  <p className="text-sm text-gray-600">{slot.time}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {slot.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Nutrition Standards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-amber-600 mb-4 flex items-center">
              <Carrot className="mr-2" size={24} />
              Nutrition Standards
            </h3>
            <p className="mb-4">
              All nutritional values are provided per 100 grams of edible
              portion, following:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Indian standards (NIN, ICMR)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>USDA National Nutrient Database</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>FAO Food Composition Tables</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-green-700 italic">
                &quot;Let food be thy medicine and medicine be thy food.&quot; -
                Hippocrates
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}