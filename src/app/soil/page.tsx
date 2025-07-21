"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const soilTypes = [
  {
    name: "Alluvial Soil",
    description: "Alluvial soil is the most fertile and widespread soil in India, covering about 40% of the total land area. It's found in the Indo-Gangetic plains, Brahmaputra valley, and coastal regions. Formed by deposits of rivers, this soil is rich in potash, phosphoric acid, and lime but deficient in nitrogen.",
    regions: "Punjab, Haryana, Uttar Pradesh, Bihar, West Bengal, Assam, and coastal regions",
    crops: "Rice, wheat, sugarcane, cotton, jute, and oilseeds",
    image: "/nature/alluvial.jpg",
    color: "bg-amber-50",
    ph: "6.5-8.4",
    characteristic: "Highly fertile, river deposits"
  },
  {
    name: "Black Soil (Regur)",
    description: "Black soil, also known as Regur soil, is ideal for cotton cultivation and is often called 'black cotton soil'. This clayey soil is rich in iron, lime, calcium, magnesium, alumina, and potash but poor in phosphorous, nitrogen, and organic matter. It has excellent moisture retention capacity.",
    regions: "Maharashtra, Gujarat, Madhya Pradesh, Karnataka, Andhra Pradesh, Tamil Nadu",
    crops: "Cotton, sugarcane, jowar, tobacco, wheat, and oilseeds",
    image: "/nature/black.jpg",
    color: "bg-stone-100",
    ph: "7.2-8.5",
    characteristic: "High clay content, moisture retentive"
  },
  {
    name: "Red Soil",
    description: "Red soil develops on crystalline igneous rocks in areas of low rainfall. The red color comes from iron diffusion. This soil is porous, friable, and deficient in nitrogen, phosphorus, and humus but fairly rich in potash. It's suitable for cultivation with proper irrigation and fertilizers.",
    regions: "Tamil Nadu, Karnataka, Andhra Pradesh, Odisha, Jharkhand, Chhattisgarh",
    crops: "Groundnut, millet, potato, maize, pulses, and tobacco",
    image: "/nature/red.jpg",
    color: "bg-red-50",
    ph: "5.5-7.5",
    characteristic: "Iron-rich, porous structure"
  },
  {
    name: "Laterite Soil",
    description: "Laterite soil develops in areas with high temperature and heavy rainfall. The intense leaching makes it poor in lime and silica but rich in iron oxide and aluminum compounds. This soil is generally infertile but can be productive with proper treatment and irrigation.",
    regions: "Kerala, Karnataka, Tamil Nadu, Madhya Pradesh, Assam, and Odisha",
    crops: "Tea, coffee, rubber, cashew, and coconut",
    image: "/nature/laterite.jpg",
    color: "bg-orange-50",
    ph: "4.5-6.0",
    characteristic: "Highly leached, rich in iron oxide"
  },
  {
    name: "Arid/Desert Soil",
    description: "Arid soil is found in desert regions with low rainfall and high temperature. It's sandy, porous, and deficient in organic matter, nitrogen, and moisture. The phosphate content is normal but nitrogen is inadequate. With irrigation, these soils can become productive.",
    regions: "Rajasthan, Gujarat, Haryana, and Punjab",
    crops: "Barley, millet, guar, pulses, and wheat (with irrigation)",
    image: "/nature/arid.jpg",
    color: "bg-yellow-50",
    ph: "7.5-8.5",
    characteristic: "Sandy texture, low moisture"
  },
  {
    name: "Saline Soil",
    description: "Saline soils contain excessive soluble salts that inhibit plant growth. These soils develop in arid regions and waterlogged areas. The process of accumulation of salts is called salinization. Reclamation involves leaching salts and adding gypsum.",
    regions: "Gujarat, Rajasthan, Haryana, Punjab, Uttar Pradesh, and coastal areas",
    crops: "Barley, cotton, sugarcane (after reclamation)",
    image: "/nature/saline.jpg",
    color: "bg-blue-50",
    ph: ">8.5",
    characteristic: "High salt concentration"
  },
  {
    name: "Peaty/Marshy Soil",
    description: "Peaty soil is found in areas with heavy rainfall and high humidity. It's black in color, highly acidic, and rich in organic matter (10-40%). These soils are generally submerged in water and need drainage for agricultural use.",
    regions: "Kerala, coastal Odisha, Tamil Nadu, Sundarbans (West Bengal)",
    crops: "Rice, coconut, and vegetables (after drainage)",
    image: "/nature/marshy.jpg",
    color: "bg-emerald-50",
    ph: "3.5-5.0",
    characteristic: "High organic content, waterlogged"
  },
  {
    name: "Forest Soil",
    description: "Forest soils are found in hilly and mountainous regions covered with forests. The texture varies depending on the mountain environment. These soils are rich in humus but deficient in potash, phosphorus, and lime. They're generally acidic.",
    regions: "Himalayan region, Western and Eastern Ghats, some parts of the Peninsula",
    crops: "Tea, coffee, spices, and tropical fruits",
    image: "/nature/forest.jpg",
    color: "bg-green-50",
    ph: "4.0-6.5",
    characteristic: "Rich in humus, acidic"
  }
];

function SoilComparisonTable() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="overflow-x-auto mb-12 bg-white p-6 rounded-xl shadow-sm max-w-5xl mx-auto border border-green-100"
    >
      <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Soil Characteristics Comparison</h3>
      <table className="min-w-full divide-y divide-green-100">
        <thead>
          <tr className="bg-green-50">
            <th className="p-3 text-left font-semibold text-green-700">Soil Type</th>
            <th className="p-3 text-left font-semibold text-green-700">pH Level</th>
            <th className="p-3 text-left font-semibold text-green-700">Key Characteristic</th>
            <th className="p-3 text-left font-semibold text-green-700">Main Regions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-50">
          {soilTypes.map((soil, index) => (
            <tr key={index} className="hover:bg-green-50 transition-colors">
              <td className="p-3 font-medium">{soil.name}</td>
              <td className="p-3">{soil.ph}</td>
              <td className="p-3">{soil.characteristic}</td>
              <td className="p-3 text-sm">{soil.regions.split(', ').slice(0, 3).join(', ')}...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function SoilMapPreview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="my-12 text-center"
    >
      <h3 className="text-2xl font-bold text-green-800 mb-6">
        Soil Distribution Across India
      </h3>
      <div className="relative h-80 w-full max-w-3xl mx-auto bg-green-50 rounded-xl border-2 border-green-200 flex items-center justify-center">
        <Image 
          src="/nature/india-map.jpg" 
          alt="India soil distribution map"
          fill
          className="object-contain p-4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-50/80 to-transparent"></div>
        <p className="relative z-10 bg-white px-4 py-2 rounded-full text-green-600 font-medium shadow-sm">
          Interactive map coming soon!
        </p>
      </div>
    </motion.div>
  );
}

export default function SoilTypesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Soil Types of India
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl max-w-4xl mx-auto"
        >
          Discover the diverse soil types that form the foundation of India&apos;s agricultural wealth
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <p className="text-lg text-gray-700 mb-6">
            India&apos;s diverse geography gives rise to various soil types, each with unique properties 
            and agricultural potential. Understanding these soils is crucial for sustainable farming 
            and maximizing crop yields.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <SoilComparisonTable />

        {/* Map Preview */}
        <SoilMapPreview />

        {/* Soil Cards Section */}
        <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Detailed Soil Profiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {soilTypes.map((soil, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className={`rounded-xl overflow-hidden shadow-md ${soil.color} border border-green-100 hover:border-green-300 transition-all`}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={soil.image}
                  alt={soil.name}
                  fill
                  className="object-cover"
                  priority={index < 3} // Prioritize loading first few images
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-2">{soil.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                    pH: {soil.ph}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{soil.description}</p>
                
                <div className="mb-3">
                  <h3 className="font-semibold text-green-700 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Found in:
                  </h3>
                  <p className="text-gray-600 ml-5">{soil.regions}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-green-700 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Suitable Crops:
                  </h3>
                  <p className="text-gray-600 ml-5">{soil.crops}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-900 text-white py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Ready to learn more about soil management?</h3>
          <p className="text-lg mb-6">Understanding soil types is just the first step toward sustainable agriculture.</p>
          <button className="bg-white text-green-800 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors">
            Explore Soil Conservation Techniques
          </button>
          <p className="mt-6 text-green-200">AgriBloom - Cultivating Knowledge for a Greener Tomorrow</p>
        </div>
      </div>
    </div>
  );
}