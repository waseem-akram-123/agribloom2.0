import Image from 'next/image';

export default function NaturePage() {
  const medicinalTrees = [
    {
      name: "Neem (Azadirachta indica)",
      benefits: "Antibacterial, antifungal, blood purifier, used in dental care, skin problems.",
      found: "Almost all Indian states — field borders and near homes.",
      parts: "Leaves, bark, seeds, oil.",
      image: "/nature/neem.jpg"
    },
    {
      name: "Amla (Phyllanthus emblica)",
      benefits: "Rich in Vitamin C; immunity booster, digestion, liver health.",
      found: "UP, MP, Rajasthan, forest belts.",
      parts: "Fruit (fresh/dried).",
      image: "/nature/amla.jpg"
    },
    {
      name: "Arjuna (Terminalia arjuna)",
      benefits: "Cardiac health, controls cholesterol.",
      found: "Riverbanks in MP, Odisha, Bengal.",
      parts: "Bark.",
      image: "/nature/arjuna.jpg"
    },
    {
      name: "Bael (Aegle marmelos)",
      benefits: "Digestive aid, cooling effect.",
      found: "Northern & Central dry forests.",
      parts: "Fruit, leaves, bark.",
      image: "/nature/bael.jpg"
    },
    {
      name: "Ashoka (Saraca asoca)",
      benefits: "Menstrual relief, anti-inflammatory.",
      found: "Western Ghats, Assam.",
      parts: "Bark, flowers.",
      image: "/nature/ashoka.jpg"
    },
    {
      name: "Peepal (Ficus religiosa)",
      benefits: "Used for respiratory issues, skin, spiritual significance.",
      found: "Throughout India — roadsides, temples.",
      parts: "Bark, leaves, fruit.",
      image: "/nature/peepal.jpg"
    },
    {
      name: "Tulsi (Ocimum sanctum)",
      benefits: "Cough relief, stress reduction, immunity.",
      found: "Pan-India — courtyards, temples.",
      parts: "Leaves, seeds.",
      image: "/nature/tulsi.jpg"
    }
  ];

  const poisonousPlants = [
    {
      name: "Datura (Datura stramonium)",
      effects: "Hallucinogenic; toxic seeds and flowers.",
      found: "Fallow lands, village edges.",
      image: "/nature/datura.jpg"
    },
    {
      name: "Castor Plant (Ricinus communis)",
      effects: "Ricin in seeds; causes liver damage.",
      found: "Weedy village areas.",
      image: "/nature/castor.jpg"
    },
    {
      name: "Calotropis (C. gigantea / procera)",
      effects: "Milky latex causes skin and eye issues.",
      found: "Roadsides, dry land.",
      image: "/nature/calotropis.jpg"
    },
    {
      name: "Oleander (Nerium oleander)",
      effects: "Entire plant is toxic, affects heart.",
      found: "Garden edges, roadsides.",
      image: "/nature/oleander.jpg"
    },
    {
      name: "Lantana (Lantana camara)",
      effects: "Liver-toxic berries; affects cattle.",
      found: "Field edges, forests.",
      image: "/nature/lantana.jpg"
    },
    {
      name: "Parthenium (Parthenium hysterophorus)",
      effects: "Allergy-causing weed.",
      found: "Canal banks, waste fields.",
      image: "/nature/parthenium.jpg"
    },
    {
      name: "Yellow Oleander (Thevetia peruviana)",
      effects: "Seeds are deadly if chewed.",
      found: "Fenced gardens, village borders.",
      image: "/nature/yellow-oleander.jpg"
    },
    {
      name: "Rosary Pea (Abrus precatorius)",
      effects: "Red-black seeds are extremely poisonous.",
      found: "Hedgerows, fence lines in rural areas.",
      image: "/nature/rosary-pea.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            <span className="inline-block mr-2">🌿</span>
            Medicinal & Poisonous Plants in Indian Villages
            <span className="inline-block ml-2">☠️</span>
          </h1>
          <p className="text-green-600 max-w-2xl mx-auto">
            Discover the healing power and hidden dangers of plants commonly found in rural India
          </p>
        </header>

        {/* Medicinal Trees */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-1 bg-green-200 flex-1"></div>
            <h2 className="text-3xl font-bold text-green-700 px-6 flex items-center">
              <span className="mr-3">🌿</span> Popular Medicinal Trees
            </h2>
            <div className="h-1 bg-green-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicinalTrees.map((plant, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 relative overflow-hidden">
                  <Image 
                    src={plant.image} 
                    alt={plant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Medicinal
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">{plant.name}</h3>
                  <p className="text-gray-600 mb-4">{plant.benefits}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">📍</span>
                      <span className="text-gray-700"><span className="font-medium">Found in:</span> {plant.found}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✋</span>
                      <span className="text-gray-700"><span className="font-medium">Parts Used:</span> {plant.parts}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Poisonous Plants */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-1 bg-red-200 flex-1"></div>
            <h2 className="text-3xl font-bold text-red-700 px-6 flex items-center">
              <span className="mr-3">☠️</span> Common Poisonous Plants
            </h2>
            <div className="h-1 bg-red-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poisonousPlants.map((plant, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 relative overflow-hidden">
                  <Image 
                    src={plant.image} 
                    alt={plant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Poisonous
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-2">{plant.name}</h3>
                  <p className="text-gray-600 mb-4">{plant.effects}</p>
                  <div className="flex items-start text-sm">
                    <span className="text-red-500 mr-2 mt-0.5">📍</span>
                    <span className="text-gray-700"><span className="font-medium">Found in:</span> {plant.found}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-12">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-500 text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-yellow-800">Important Safety Notice</h3>
              <div className="mt-2 text-yellow-700">
                <p>
                  While many plants have medicinal properties, improper use can be harmful. Always consult with an experienced practitioner before using any plant medicinally. Never consume plants you cannot positively identify, and keep poisonous plants away from children and pets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}