"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bug, SprayCan, Leaf, AlertCircle, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import pestData from "@/data/insect.json";
import { CropInsectData } from "@/types/insect";

const Shield = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function InsectPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<CropInsectData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSelectedCrop(null);
      setError("");
      return;
    }

    const foundCrop = (pestData as CropInsectData[]).find(
      (crop) =>
        crop.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.scientificName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundCrop) {
      setSelectedCrop(foundCrop);
      setError("");
    } else {
      setSelectedCrop(null);
      setError("No data found for this crop. Please try another search term.");
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bug className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">
              Crop Pest & Solution Finder
            </h1>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for a crop (e.g., Tea, Rice, Wheat)..."
                className="pl-10 pr-12 py-6 text-lg border-2 border-green-300 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => {
                  setError("");
                  setSearchTerm("");
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {selectedCrop && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-green-200 shadow-sm">
                  <CardHeader className="bg-green-50 border-b border-green-200">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-green-600" />
                      {selectedCrop.commonName}
                      {selectedCrop.scientificName && (
                        <span className="text-lg font-normal text-gray-600">
                          ({selectedCrop.scientificName})
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="pests">
                      <TabsList className="grid grid-cols-3 bg-green-50">
                        <TabsTrigger
                          value="pests"
                          className="flex items-center gap-2"
                        >
                          <Bug className="h-4 w-4" /> Pests
                        </TabsTrigger>
                        <TabsTrigger
                          value="solutions"
                          className="flex items-center gap-2"
                        >
                          <SprayCan className="h-4 w-4" /> Solutions
                        </TabsTrigger>
                        <TabsTrigger
                          value="prevention"
                          className="flex items-center gap-2"
                        >
                          <Shield className="h-4 w-4" /> Prevention
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="pests" className="p-6">
                        {selectedCrop.insects.map((pest, i) => (
                          <div key={i} className="mb-4">
                            <h4 className="font-semibold">{pest.name}</h4>
                            <p className="text-gray-700 text-sm">
                              {pest.effect}
                            </p>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="solutions" className="p-6">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          {selectedCrop.solution.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </TabsContent>

                      <TabsContent value="prevention" className="p-6">
                        <p className="text-gray-700 text-sm italic">
                          Early detection is the best prevention.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="bg-green-50 border-t border-green-200 py-3 px-6 text-sm text-gray-600">
                    Last updated: {new Date().toLocaleDateString()}
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Bug,
//   Leaf,
//   AlertCircle,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import pestData from "@/data/insect.json";
// import { CropInsectData } from "@/types/insect";

// const Shield = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//   </svg>
// );

// const MovingInsect = ({ icon, style }: { icon: React.ReactNode; style: any }) => (
//   <motion.div
//     className="pointer-events-none fixed text-4xl"
//     initial={style.initial}
//     animate={style.animate}
//     transition={style.transition}
//   >
//     {icon}
//   </motion.div>
// );

// export default function InsectPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCrop, setSelectedCrop] = useState<CropInsectData | null>(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setSelectedCrop(null);
//       setError("");
//       return;
//     }

//     const foundCrop = (pestData as CropInsectData[]).find(
//       (crop) =>
//         crop.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         crop.scientificName?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (foundCrop) {
//       setSelectedCrop(foundCrop);
//       setError("");
//     } else {
//       setSelectedCrop(null);
//       setError("No data found for this crop. Please try another search term.");
//     }
//   }, [searchTerm]);

//   return (
//     <div className="min-h-screen bg-green-50 overflow-hidden relative">
//       {/* Animated bugs and leaves using only Bug and Leaf icons */}
//       {/* 6 Bug icons */}
//       <MovingInsect
//         icon={<Bug className="text-red-500" />} // Bug 1
//         style={{
//           initial: { x: -50, y: 150 },
//           animate: { x: [0, 300, 600, -50], y: [150, 160, 140, 150], rotate: 360 },
//           transition: { duration: 18, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Bug className="text-blue-500" />} // Bug 2
//         style={{
//           initial: { x: -40, y: 300 },
//           animate: { x: [0, 400, 800], y: [300, 310, 290] },
//           transition: { duration: 22, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Bug className="text-purple-600" />} // Bug 3
//         style={{
//           initial: { x: 1200, y: 0 },
//           animate: { y: [0, 150, 300, 450] },
//           transition: { duration: 28, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Bug className="text-pink-700" />} // Bug 4
//         style={{
//           initial: { x: 0, y: 200 },
//           animate: { x: [0, 300, 600, 0], y: [200, 220, 190, 200] },
//           transition: { duration: 25, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Bug className="text-yellow-600" />} // Bug 5
//         style={{
//           initial: { x: -60, y: 500 },
//           animate: { x: [0, 700, 0], y: [500, 520, 490] },
//           transition: { duration: 27, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Bug className="text-indigo-400" />} // Bug 6
//         style={{
//           initial: { x: 50, y: 0 },
//           animate: { x: [50, 300, 550], y: [0, 20, 10, 0] },
//           transition: { duration: 20, repeat: Infinity, ease: "linear" },
//         }}
//       />

//       {/* 4 Leaf icons */}
//       <MovingInsect
//         icon={<Leaf className="text-green-600" />} // Leaf 1
//         style={{
//           initial: { x: 100, y: 100 },
//           animate: { x: [100, 400, 100], y: [100, 120, 100] },
//           transition: { duration: 24, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Leaf className="text-green-500" />} // Leaf 2
//         style={{
//           initial: { x: 400, y: 200 },
//           animate: { x: [400, 700, 400], y: [200, 220, 200] },
//           transition: { duration: 26, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Leaf className="text-green-400" />} // Leaf 3
//         style={{
//           initial: { x: 200, y: 300 },
//           animate: { x: [200, 500, 200], y: [300, 320, 300] },
//           transition: { duration: 28, repeat: Infinity, ease: "linear" },
//         }}
//       />
//       <MovingInsect
//         icon={<Leaf className="text-green-700" />} // Leaf 4
//         style={{
//           initial: { x: 300, y: 400 },
//           animate: { x: [300, 600, 300], y: [400, 420, 400] },
//           transition: { duration: 30, repeat: Infinity, ease: "linear" },
//         }}
//       />
//     </div>
//   );
// }
