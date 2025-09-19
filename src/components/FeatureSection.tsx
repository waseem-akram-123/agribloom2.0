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
import { useTranslation } from "@/hooks/useTranslation";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: BookOpenCheck,
      title: t('features.agrilens'),
      description: t('features.agrilensDesc'),
    },
    {
      icon: Bug,
      title: t('features.insectManagement'),
      description: t('features.insectDesc'),
    },
    {
      icon: Heart,
      title: t('features.healthBenefits'),
      description: t('features.healthDesc'),
    },
    {
      icon: Sprout,
      title: t('features.medicinalPlants'),
      description: t('features.medicinalDesc'),
    },
    {
      icon: Leaf,
      title: t('features.soilGuide'),
      description: t('features.soilDesc'),
    },
    {
      icon: IndianRupee,
      title: t('features.marketRates'),
      description: t('features.marketDesc'),
    },
    {
      icon: AlarmClock,
      title: t('features.shelfLife'),
      description: t('features.shelfDesc'),
    },
    {
      icon: FlaskConical,
      title: t('features.farmingTechniques'),
      description: t('features.farmingDesc'),
    },
  ];

  return (
    <section className="py-16 bg-white text-green-900 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        {t('features.title')}
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
