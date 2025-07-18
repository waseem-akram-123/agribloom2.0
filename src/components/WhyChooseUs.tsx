"use client";

import {
  ShieldCheck,
  FileCheck,
  SearchCheck,
  BookUser,
} from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Trusted & Verified Sources",
    desc: "We rely on government portals, agricultural universities, and verified farming communities. No random content here.",
  },
  {
    icon: FileCheck,
    title: "Field-Tested Knowledge",
    desc: "Our information isn't just theoretical — it’s validated by real farmers and agronomists across India.",
  },
  {
    icon: SearchCheck,
    title: "No More Endless Searching",
    desc: "Stop hopping between 10 websites. Get sunlight, pests, soil, and market data — all in one place.",
  },
  {
    icon: BookUser,
    title: "Simplified For Everyone",
    desc: "From new farmers to agri students to experts, our platform is designed to be clear, focused, and helpful.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 text-green-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Why Choose AgriBloom?
      </h2>
      <p className="text-center text-amber-950 max-w-2xl mx-auto mb-10">
        We don’t believe in random internet farming tips. AgriBloom is built on
        reliable, government-verified data, field research, and a deep
        understanding of what Indian farmers really need.
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
