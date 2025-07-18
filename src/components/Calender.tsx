"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

const insights = [
  {
    title: "Best Monsoon Crops to Sow in Early July",
    date: "Jul 5, 2025",
    summary:
      "Start your tomato crop journey now! The first monsoon showers are ideal for sowing fast-growing vegetables.",
  },
  {
    title: "Nutrient Boost: Fertilizer Tips for Young Tomato Plants",
    date: "Jul 15, 2025",
    summary:
      "10 days after sowing, it's the perfect time to feed your crops. Learn what nutrients your tomatoes crave most.",
  },
  {
    title: "How to Harvest Tomatoes for Long Shelf Life",
    date: "Aug 25, 2025",
    summary:
      "Pick your produce at the right maturity stage to ensure longer storage and better flavor post-harvest.",
  },
];

export default function LatestInsightsWithCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="py-16 px-6 md:px-20 bg-white text-green-900">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-start">
        {/* Left: Timeline Articles */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Latest Insights</h2>
          <ul className="space-y-6">
            {insights.map((item, index) => (
              <li key={index} className="border-l-4 border-green-600 pl-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                <p className="text-sm text-green-800">{item.summary}</p>
              </li>
            ))}
          </ul>
          <div>
            <Link href="/agrilens">
              {" "}
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow">
                know more
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Calendar */}
        <div className="flex justify-center md:justify-start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow-sm"
            captionLayout="dropdown"
          />
        </div>
      </div>
    </section>
  );
}
