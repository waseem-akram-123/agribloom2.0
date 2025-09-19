"use client";

import {
  ShieldCheck,
  FileCheck,
  SearchCheck,
  BookUser,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const points = [
    {
      icon: ShieldCheck,
      title: t('whyChooseUs.trustedSources'),
      desc: t('whyChooseUs.trustedDesc'),
    },
    {
      icon: FileCheck,
      title: t('whyChooseUs.fieldTested'),
      desc: t('whyChooseUs.fieldDesc'),
    },
    {
      icon: SearchCheck,
      title: t('whyChooseUs.noSearching'),
      desc: t('whyChooseUs.searchDesc'),
    },
    {
      icon: BookUser,
      title: t('whyChooseUs.simplified'),
      desc: t('whyChooseUs.simplifiedDesc'),
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-20 text-green-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        {t('whyChooseUs.title')}
      </h2>
      <p className="text-center text-amber-950 max-w-2xl mx-auto mb-10">
        {t('whyChooseUs.subtitle')}
      </p>

      <div className="max-w-3xl mx-auto space-y-8 border-l-4 border-green-200 pl-6">
        {points.map((point, idx) => (
          <div key={idx}>
            <div className="flex items-center mb-2">
              <point.icon className="w-6 h-6 text-green-700 mr-3" />
              <h3 className="text-lg font-semibold">{point.title}</h3>
            </div>
            <p className="text-sm text-gray-800">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
