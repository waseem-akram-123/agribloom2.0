"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

interface PriceData {
  market: string;
  min: number;
  max: number;
  modal: number;
  date: string;
}

interface MandiResponse {
  prices: PriceData[];
  commodity: string;
  state: string;
  message: string;
}

export default function MandiPricesComponent() {
  const { selectedLanguage, translateText } = useLanguage();
  const { t } = useTranslation();
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState("Tomato");
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [selectedDistrict, setSelectedDistrict] = useState("all-districts");
  const [responseData, setResponseData] = useState<MandiResponse | null>(null);
  const [translatedAdvice, setTranslatedAdvice] = useState("");
  
  // Real data from API
  const [commodities, setCommodities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [districtsByState, setDistrictsByState] = useState<{[key: string]: string[]}>({});
  const [loadingData, setLoadingData] = useState(true);

  // Load mandis data on component mount
  React.useEffect(() => {
    const loadMandisData = async () => {
      try {
        // Load from new CSV-based API
        const response = await fetch('/api/mandis-list');
        
        if (response.ok) {
          const data = await response.json();
          
          console.log('Loaded mandis data from CSV:', data);
          
          // Extract states, districts, commodities, and markets from CSV data
          const statesList = data.states || [];
          const districtsList = data.districts || [];
          const commoditiesList = data.commodities || [];
          const marketsList = data.markets || [];
          const districtsByStateData = data.districtsByState || {};
          
          setCommodities(commoditiesList);
          setStates(statesList);
          setDistricts(districtsList);
          setDistrictsByState(districtsByStateData);
          setLoadingData(false);
          
          // Set default values
          if (statesList.length > 0) {
            setSelectedState(statesList[0]);
          }
          const tomatoCommodity = commoditiesList.find((c: string) => 
            c.toLowerCase().includes('tomato')) || commoditiesList[0];
          if (tomatoCommodity) {
            setSelectedCommodity(tomatoCommodity);
          }
          if (districtsList.length > 0) {
            setSelectedDistrict(districtsList[0]);
          }
        }
      } catch (error) {
        console.error('Failed to load mandis data:', error);
      } finally {
        setLoadingData(false);
      }
    };
    
    loadMandisData();
  }, []);

  // Filter districts based on selected state
  React.useEffect(() => {
    if (selectedState && districtsByState[selectedState]) {
      const stateDistricts = districtsByState[selectedState];
      setDistricts(stateDistricts);
      setSelectedDistrict("all-districts"); // Reset district when state changes
    } else {
      setDistricts([]);
      setSelectedDistrict("all-districts");
    }
  }, [selectedState, districtsByState]);

  const fetchPrices = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/mandi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              commodity: selectedCommodity,
              state: selectedState,
              district: selectedDistrict === "all-districts" ? undefined : selectedDistrict
            }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch mandi prices');
      }

      const data: MandiResponse = await res.json();
      setPrices(data.prices);
      setResponseData(data);

      // Generate farmer advice and translate it
      if (data.prices.length > 0) {
        const advice = generateFarmerAdvice(data.prices, data.commodity);
        
        // Translate using the language context
        const translated = await translateText(advice);
        setTranslatedAdvice(translated);
      } else {
        // Clear previous advice when no results
        setTranslatedAdvice("");
      }

    } catch (error) {
      console.error('Mandi fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateFarmerAdvice = (priceData: PriceData[], commodity: string): string => {
    if (priceData.length === 0) return "No price data available.";

    // Find the market with highest and lowest modal prices
    const sortedByPrice = [...priceData].sort((a, b) => a.modal - b.modal);
    const lowestPriceMarket = sortedByPrice[0];
    const highestPriceMarket = sortedByPrice[sortedByPrice.length - 1];

    const priceDifference = highestPriceMarket.modal - lowestPriceMarket.modal;
    const priceDifferencePercent = (priceDifference / lowestPriceMarket.modal) * 100;

    if (priceDifferencePercent > 20) {
      return `💰 Price Alert: ${commodity} prices vary significantly! Best price at ${lowestPriceMarket.market} (₹${lowestPriceMarket.modal}/kg). Consider selling at ${highestPriceMarket.market} for better profits (₹${highestPriceMarket.modal}/kg).`;
    } else if (priceDifferencePercent > 10) {
      return `📊 Market Analysis: ${commodity} prices are stable with moderate variation. Best selling option: ${highestPriceMarket.market} (₹${highestPriceMarket.modal}/kg).`;
    } else {
      return `✅ Good News: ${commodity} prices are consistent across markets. All mandis offer similar rates around ₹${Math.round((lowestPriceMarket.modal + highestPriceMarket.modal) / 2)}/kg.`;
    }
  };


  return (
    <div className="p-6 border rounded-xl shadow-lg max-w-4xl mx-auto bg-white">

      {/* Controls */}
      {loadingData ? (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">{t('mandi.loadingData')}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Label htmlFor="commodity-select" className="block text-sm font-medium text-gray-700 mb-2">
{t('mandi.commodity')} ({commodities.length} {t('mandi.available')})
            </Label>
            <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
              <SelectTrigger id="commodity-select" className="w-full">
                <SelectValue placeholder={t('mandi.commodity')} />
              </SelectTrigger>
              <SelectContent>
                {commodities.map((commodity, index) => (
                  <SelectItem key={`commodity-${index}-${commodity}`} value={commodity}>
                    {commodity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">
{t('mandi.state')} ({states.length} {t('mandi.available')})
            </Label>
            <Select 
              value={selectedState} 
              onValueChange={(value) => {
                setSelectedState(value);
                setSelectedDistrict("all-districts"); // Reset district when state changes
              }}
            >
              <SelectTrigger id="state-select" className="w-full">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state, index) => (
                  <SelectItem key={`state-${index}-${state}`} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="district-select" className="block text-sm font-medium text-gray-700 mb-2">
{t('mandi.district')} (Optional)
            </Label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger id="district-select" className="w-full">
                <SelectValue placeholder={t('mandi.allDistricts')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-districts">{t('mandi.allDistricts')}</SelectItem>
                {districts.map((district: string, index: number) => (
                  <SelectItem key={`district-${index}-${district}`} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchPrices}
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold"
            >
{loading ? t('mandi.fetching') : t('mandi.getPrices')}
            </button>
          </div>
        </div>
      )}

      {/* Price Data */}
      {!loading && responseData && (
        <>
          {prices.length > 0 ? (
        <div className="space-y-4">
          {/* Market Prices Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-green-50">
                <tr>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Market</th>
                  <th className="border border-gray-300 p-3 text-center font-semibold">Min Price (₹/kg)</th>
                  <th className="border border-gray-300 p-3 text-center font-semibold">Max Price (₹/kg)</th>
                  <th className="border border-gray-300 p-3 text-center font-semibold">Modal Price (₹/kg)</th>
                  <th className="border border-gray-300 p-3 text-center font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">{price.market}</td>
                    <td className="border border-gray-300 p-3 text-center">{price.min}</td>
                    <td className="border border-gray-300 p-3 text-center">{price.max}</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-600">{price.modal}</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">{price.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Farmer Advice */}
          {responseData && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <span className="text-xl">📍</span>
                Farmer Advice
              </h3>
              <p className="text-sm text-blue-700">
                {translatedAdvice || generateFarmerAdvice(prices, selectedCommodity)}
              </p>
              {selectedLanguage !== 'en' && translatedAdvice && (
                <div className="text-xs text-gray-500 mt-1">
                  Translated to {selectedLanguage.toUpperCase()}
                </div>
              )}
            </div>
          )}

          {/* Data Source Info */}
          <div className="text-center text-xs text-gray-500 mt-4">
            <p>{responseData?.message}</p>
          </div>
        </div>
          ) : (
            /* No Results Message */
            <div className="text-center py-8 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-6xl text-red-400 block mb-4">❌</span>
              <h3 className="text-xl font-semibold text-red-800 mb-2">No Results Found</h3>
              <p className="text-red-700 mb-4">{responseData?.message}</p>
              <div className="text-sm text-red-600">
                <p><strong>Try:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Selecting a different commodity</li>
                  <li>Choosing a different state</li>
                  <li>Removing the district filter</li>
                  <li>Checking available options in the dropdowns above</li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}

      {!loading && !responseData && (
        <div className="text-center text-gray-600 py-8">
          <span className="text-6xl text-gray-400 block mb-4">🛒</span>
<p>{t('mandi.selectAndClick')}</p>
        </div>
      )}
    </div>
  );
}
