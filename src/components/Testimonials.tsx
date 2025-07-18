"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Ramesh Yadav",
    designation: "Senior Farmer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Anjali Verma",
    designation: "Agriculture Officer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Hashmath Bi",
    designation: "Soil Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Revathi Subramanian",
    designation: "Horticulture Expert",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Iqbal Hussain",
    designation: "Tribal Farming Advocate",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Neha Thomas",
    designation: "AgriTech Researcher",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3534&q=80",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
