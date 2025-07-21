"use client";

import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";

const dummyContent = [
  {
    title: "Grafting",
    description: (
      <>
        <p className="text-lg">
          Grafting is a widely used plant propagation technique where tissues
          from two different plants are joined together so that they grow as a
          single plant. This method is especially beneficial in fruit trees like
          mango, citrus, and guava, where the rootstock provides disease
          resistance and the scion (top part) ensures quality fruit. Grafting
          allows farmers to produce high-yielding, faster-growing, and more
          resilient plants with desirable traits from both parent varieties.
        </p>
        <p className="text-lg">
          Grafting dates back over 2,000 years and was first recorded in ancient
          China and Greece. Today, it is essential in modern orchard management
          and is even used to rejuvenate old trees with new, improved varieties.
        </p>
      </>
    ),
    badge: "Modern",
    image:"/nature/grafting.jpg"
  },
  {
    title: "Budding",
    description: (
      <>
        <p className="text-lg">
          Budding is a specific type of grafting where a single bud from one
          plant is inserted into the stem of another plant. This technique is
          commonly used in horticulture, especially for propagating rose plants
          and citrus trees. Budding is efficient because it requires less
          material than full grafting and allows rapid multiplication of
          superior varieties.
        </p>
        <p className="text-lg">
          Budding became prominent in Europe during the 18th century as a faster
          alternative to traditional grafting. It is widely used in commercial
          nurseries due to its high success rate and minimal plant material
          requirement.
        </p>
      </>
    ),
    badge: "Modern",
    image: "/nature/budding.jpg",
  },
  {
    title: "layering",
    description: (
      <>
        <p className="text-lg">
          Layering is a technique in which a stem is bent down and covered with
          soil while still attached to the parent plant. Over time, roots
          develop from the buried portion, and the new plant can be cut and
          transplanted. Layering is commonly used for plants like jasmine,
          lemon, and hibiscus, especially when cuttings are difficult to root.
        </p>
        <p className="text-lg">
          Layering has been practiced since ancient times, especially in Asia,
          where it was used to propagate ornamental and medicinal plants. It
          remains popular among small-scale farmers and gardeners because it
          requires no specialized tools.
        </p>
      </>
    ),
    badge: "Modern",
    image: "/nature/layering.jpg",
  },
  {
    title: "Tissue Culture",
    description: (
      <>
        <p className="text-lg">
          Tissue Culture is a high-tech propagation method where a small piece
          of plant tissue (often just a few cells) is grown in sterile lab
          conditions on a nutrient medium. This technique is especially useful
          for producing disease-free, uniform, and fast-growing plants like
          bananas, orchids, sugarcane, and potatoes. Tissue culture enables mass
          multiplication of high-value crops in a very short time.
        </p>
        <p className="text-lg">
          Developed in the early 1900s, tissue culture became commercially
          viable in the 1960s with advancements in plant biotechnology. It’s now
          a cornerstone of modern agriculture for producing virus-free,
          export-quality planting material.
        </p>
      </>
    ),
    badge: "Modern",
    image: "/nature/tissue.jpg",
  },
  {
    title: "Bonsai Technique",
    description: (
      <>
        <p className="text-lg">
          Bonsai is the Japanese art of growing miniature trees in containers,
          mimicking the shape and scale of full-sized trees. It involves precise
          pruning, wiring, and root trimming to control the tree’s growth and
          create an aesthetically pleasing miniature form. Though not a
          commercial farming method, bonsai represents a specialized
          horticultural technique that emphasizes patience, artistic skill, and
          plant care.
        </p>
        <p className="text-lg">
          Bonsai originated in China over 1,300 years ago before being refined
          and popularized by Japanese horticulturists. Today, it is practiced
          worldwide not just as a gardening technique, but also as a meditative
          and artistic pursuit.
        </p>
      </>
    ),
    badge: "Modern",
    image: "/nature/bonsai.jpg",
  },
];

export default function FarmingTechniquesPage() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-green-600 text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p
              className={twMerge("text-2xl mb-4 font-semibold text-green-800")}
            >
              {item.title}
            </p>

            <div className="prose prose-lg text-gray-700">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="farming technique"
                  height={600}
                  width={600}
                  className="rounded-lg mb-10 object-cover max-h-[400px] w-full"
                  priority={false}
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}
