"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const biofertilizers = [
  {
    id: 1,
    name: "Rhizobium",
    benefit: "Fixes atmospheric nitrogen in leguminous crops",
    microorganism: "Rhizobium spp.",
    crops: "Pulses like gram, lentil, moong, soybean",
    dosage: "Seed treatment: 25g/kg of seed\nSoil application: 500g/acre before sowing (once per season)",
    image: "/nature/rhizobium.jpg",
    type: "biofertilizer"
  },
  {
    id: 2,
    name: "Azospirillum",
    benefit: "Promotes nitrogen fixation and root growth",
    microorganism: "Azospirillum spp.",
    crops: "Cereals like maize, sorghum, pearl millet, sugarcane",
    dosage: "Seed treatment: 20g/kg\nSoil: 2kg/acre mixed with compost (once; repeat after 30 days for long crops)",
    image: "/nature/azospirillum.jpg",
    type: "biofertilizer"
  },
  {
    id: 3,
    name: "Azotobacter",
    benefit: "Nitrogen fixation and growth hormone production",
    microorganism: "Azotobacter spp.",
    crops: "Wheat, vegetables, cotton, fruit crops",
    dosage: "200g–1kg/acre once per crop\nMonthly for fruit trees",
    image: "/nature/azotobacter.jpg",
    type: "biofertilizer"
  },
  {
    id: 4,
    name: "Blue-Green Algae (BGA)",
    benefit: "Fixes nitrogen in paddy fields",
    microorganism: "Anabaena, Nostoc",
    crops: "Paddy",
    dosage: "10–15 kg/ha once after 7–10 days of transplanting",
    image: "/nature/bga.jpg",
    type: "biofertilizer"
  },
  {
    id: 5,
    name: "Mycorrhiza (VAM)",
    benefit: "Enhances phosphorus and micronutrient uptake",
    microorganism: "Glomus spp.",
    crops: "Mango, citrus, vegetables, spices",
    dosage: "Nursery: 5–10g/plant\nField: 1kg/acre (repeat every 6–12 months)",
    image: "/nature/mycorrhiza.jpg",
    type: "biofertilizer"
  },
  {
    id: 6,
    name: "Phosphate Solubilizing Bacteria (PSB)",
    benefit: "Converts insoluble phosphorus to usable form",
    microorganism: "Bacillus megaterium, others",
    crops: "Cereals, oilseeds, vegetables",
    dosage: "200g–1kg/acre or 25g/kg seed (once per season)",
    image: "/nature/psb.jpg",
    type: "biofertilizer"
  },
  {
    id: 7,
    name: "Potash Mobilizing Bacteria (KMB)",
    benefit: "Mobilizes potassium for better yield",
    microorganism: "Various bacterial species",
    crops: "Banana, tomato, sugarcane, cereals",
    dosage: "1kg/acre with compost (once or twice per season)",
    image: "/nature/kmb.jpg",
    type: "biofertilizer"
  },
  {
    id: 8,
    name: "Zinc Solubilizing Bacteria (ZSB)",
    benefit: "Makes soil-bound zinc available to plants",
    microorganism: "Bacillus, Pseudomonas",
    crops: "Onion, mustard, cabbage, cereals",
    dosage: "1kg/acre or 25g/kg seed (once per crop cycle)",
    image: "/nature/zsb.jpg",
    type: "biofertilizer"
  },
  {
    id: 9,
    name: "Plant Growth Promoting Rhizobacteria (PGPR)",
    benefit: "Boosts plant immunity and root growth",
    microorganism: "Various PGPR strains",
    crops: "Vegetables, cereals, fruit crops",
    dosage: "100–200g/acre as seed treatment or root dip (once; repeat after 30 days)",
    image: "/nature/pgpr.jpg",
    type: "biofertilizer"
  },
  {
    id: 10,
    name: "Neem Khali (Neem Cake)",
    benefit: "Natural pest repellent and nitrogen source",
    crops: "Vegetables, pulses, fruits, oilseeds",
    dosage: "Field: 100–200 kg/acre before sowing\nPots: 25–50g/plant monthly",
    image: "/nature/neem-khali.jpg",
    type: "amendment"
  },
  {
    id: 11,
    name: "Cocopeat",
    benefit: "Improves soil aeration and moisture retention",
    crops: "Nurseries, vegetables, flowers",
    dosage: "Mix 10–20% in soil or 50–100 kg/acre (refresh every 3–4 months)",
    image: "/nature/cocopeat.jpg",
    type: "amendment"
  },
  {
    id: 12,
    name: "Bone Meal",
    benefit: "Rich in phosphorus and calcium for flowering/rooting",
    crops: "Carrot, beet, rose, fruit trees",
    dosage: "Field: 100–150 kg/acre\nPer plant: 20–25g every 3–4 months",
    image: "/nature/bone-meal.jpg",
    type: "amendment"
  },
  {
    id: 13,
    name: "Fish Meal",
    benefit: "High nitrogen organic fertilizer",
    crops: "Vegetables, fruit crops",
    dosage: "200–300 kg/acre split monthly",
    image: "/nature/fish-meal.jpg",
    type: "amendment"
  },
  {
    id: 14,
    name: "Panchagavya",
    benefit: "Boosts plant immunity and microbial activity",
    crops: "All crops (especially organic farms)",
    dosage: "Foliar spray: 3% every 15 days\nSoil drench: once a month",
    image: "/nature/panchagavya.jpg",
    type: "amendment"
  },
  {
    id: 15,
    name: "Vermicompost",
    benefit: "Nutrient-rich organic manure",
    crops: "Vegetables, cereals, pulses, fruit crops",
    dosage: "Field: 2–4 tons/acre\nPots: 500g–1kg/month",
    image: "/nature/vermicompost.jpg",
    type: "amendment"
  },
  {
    id: 16,
    name: "Farm Yard Manure (FYM)",
    benefit: "Improves soil texture and fertility",
    crops: "All types of crops",
    dosage: "Field: 5–10 tons/acre/year\nBeds: 1–2 kg/month",
    image: "/nature/fym.jpg",
    type: "amendment"
  },
  {
    id: 17,
    name: "Green Manure",
    benefit: "Improves soil organic matter and nitrogen",
    crops: "Paddy, sugarcane, oilseeds",
    dosage: "Grow green manure crop 45 days before main crop and plow into soil",
    image: "/nature/green-manure.jpg",
    type: "amendment"
  },
  {
    id: 18,
    name: "Seaweed Extracts",
    benefit: "Supplies hormones and micronutrients",
    crops: "Fruits, vegetables, flowers",
    dosage: "Foliar spray: 2–5 ml/liter every 15–20 days",
    image: "/nature/seaweed.jpg",
    type: "amendment"
  },
  {
    id: 19,
    name: "Rock Phosphate",
    benefit: "Slow-release phosphorus source",
    crops: "Pulses, oilseeds, acidic soils",
    dosage: "100–200 kg/acre at field preparation",
    image: "/nature/rock-phosphate.jpg",
    type: "amendment"
  },
  {
    id: 20,
    name: "Wood Ash",
    benefit: "Supplies potassium and raises pH",
    crops: "Root vegetables, fruit trees",
    dosage: "Field: 100–150 kg/acre\nPlants: 1–2 handfuls every 2–3 months",
    image: "/nature/wood-ash.jpg",
    type: "amendment"
  }
];


export default function BiofertilizersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-emerald-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/nature/microbes-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Biofertilizers & Organic Amendments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Harnessing nature's power for sustainable agriculture
          </motion.p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6 text-sm font-medium"
          >
            Sustainable Agriculture Solutions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            Nature's Microbial Allies for Healthier Crops
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Biofertilizers contain living microorganisms that enhance plant nutrition by either mobilizing 
            nutrients in soil or fixing atmospheric nitrogen. Organic amendments improve soil health through 
            non-living organic matter that feeds both plants and beneficial soil organisms.
          </motion.p>
        </div>
      </div>

      {/* Biofertilizers Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Biofertilizers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Living microorganisms that enhance plant growth through natural processes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biofertilizers.filter(b => b.type === "biofertilizer").map((bio, index) => (
              <motion.div
                key={bio.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative h-80 w-full bg-gray-100">
                  <Image
                    src={bio.image}
                    alt={bio.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{bio.name}</h3>
                      <p className="text-green-600 font-medium">{bio.microorganism}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">BENEFITS</h4>
                      <p className="text-gray-700">{bio.benefit}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">SUITABLE CROPS</h4>
                      <p className="text-gray-700">{bio.crops}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">DOSAGE</h4>
                      <p className="text-gray-700 whitespace-pre-line">{bio.dosage}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Organic Amendments Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Organic Amendments</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Natural materials that improve soil structure and nutrient availability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biofertilizers.filter(b => b.type === "amendment").map((amend, index) => (
              <motion.div
                key={amend.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="relative h-80 w-full bg-gray-100">
                  <Image
                    src={amend.image}
                    alt={amend.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{amend.name}</h3>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">BENEFITS</h4>
                      <p className="text-gray-700">{amend.benefit}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">SUITABLE CROPS</h4>
                      <p className="text-gray-700">{amend.crops}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">DOSAGE</h4>
                      <p className="text-gray-700 whitespace-pre-line">{amend.dosage}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section
      <div className="bg-gradient-to-r from-emerald-700 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to transform your farming practices?</h2>
            <p className="text-xl mb-8">Discover how biofertilizers can increase your yields while protecting the environment</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-800 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors">
                Download Complete Guide
              </button>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-800 transition-colors">
                Contact Our Experts
              </button>
            </div>
          </motion.div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">AgriBloom</h3>
            <p className="max-w-2xl mx-auto">Advancing sustainable agriculture through innovative solutions and traditional wisdom</p>
            <div className="flex justify-center gap-4 mt-6">
              {/* Social icons would go here */}
            </div>
            <p className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} AgriBloom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}