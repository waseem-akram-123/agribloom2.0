"use client";

import {
  BookOpenCheck,
  Bug,
  Heart,
  Leaf,
  IndianRupee,
  FlaskConical,
  Sprout,
  AlarmClock,
} from "lucide-react";

const features = [
  {
    icon: BookOpenCheck,
    title: "AgriLens",
    description:
      "Detailed crop information: sunlight, water, seasons, flowering, harvesting, and scientific names.",
  },
  {
    icon: Bug,
    title: "Insect Management",
    description:
      "Detect pests early and follow effective management techniques to protect your crops.",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description:
      "Explore the nutritional and medicinal advantages of each fruit, vegetable, and crop.",
  },
  {
    icon: Sprout,
    title: "Medicinal & Poisonous Plants",
    description:
      "Identify herbal plants with healing benefits and know which ones are harmful or toxic.",
  },
  {
    icon: Leaf,
    title: "Soil & Fertilizer Guide",
    description:
      "Understand various soil types and fertilizers to boost yield and crop health.",
  },
  {
    icon: IndianRupee,
    title: "Market Rates",
    description:
      "Check real-time vegetable and fruit prices from regional Indian markets.",
  },
  {
    icon: AlarmClock,
    title: "Shelf Life",
    description:
      "Know how long harvested crops stay fresh and how to store them for longer shelf life.",
  },
  {
    icon: FlaskConical,
    title: "Farming Techniques",
    description:
      "Learn about hybridization, grafting, irrigation types, vertical farming, and more.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white text-green-900 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        What You Can Explore
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-[#F1FAF1] rounded-xl border border-green-100 hover:border-green-400 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center mb-4 text-green-700">
              <feature.icon className="w-7 h-7 mr-3" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <p className="text-sm text-green-800">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
