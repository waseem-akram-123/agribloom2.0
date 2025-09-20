import { NextRequest, NextResponse } from 'next/server';
import { getMandiPrices, PriceData } from '@/lib/csvDataLoader';

interface MandiResponse {
  prices: PriceData[];
  commodity: string;
  state: string;
  district?: string;
  message: string;
  suggestions?: {
    workingCombination?: string;
    availableStates?: number;
    availableCommodities?: number;
  };
}

interface MandiRecord {
  commodity?: string;
  state?: string;
  district?: string;
  market?: string;
  market_name?: string;
  min_price?: string | number;
  minPrice?: string | number;
  max_price?: string | number;
  maxPrice?: string | number;
  modal_price?: string | number;
  modalPrice?: string | number;
  price?: string | number;
  arrival_date?: string;
  date?: string;
  arrivalDate?: string;
  [key: string]: string | number | undefined;
}


export async function POST(request: NextRequest): Promise<NextResponse<MandiResponse>> {
  try {
    let commodity = 'Tomato';
    let state = 'Karnataka';
    let district = '';
    
    try {
      const body = await request.json();
      commodity = body.commodity || commodity;
      state = body.state || state;
      district = body.district || '';
    } catch (parseError) {
      console.log('JSON parse error, using defaults:', parseError);
      // Use defaults if JSON parsing fails
    }

    console.log('Request params - Commodity:', commodity, 'State:', state, 'District:', district);

    // Use CSV data as primary source (more accurate)
    console.log('📊 Using CSV data as primary source');
    const csvResult = await getMandiPrices(commodity, state, district);
    
    if (csvResult.prices && csvResult.prices.length > 0) {
      console.log('✅ CSV data successful, returning data');
      csvResult.message += ' (Data from CSV file)';
      return NextResponse.json(csvResult);
    }

    // Fallback to Government API if CSV has no data
    console.log('⚠️ CSV data returned no results, trying Government API...');
    try {
      const governmentResult = await tryGovernmentAPI(commodity, state, district);
      
      if (governmentResult?.prices && governmentResult.prices.length > 0) {
        console.log('✅ Government API successful as fallback');
        return NextResponse.json(governmentResult);
      }
    } catch (apiError) {
      console.log('❌ Government API also failed:', apiError);
    }

    // Return CSV result even if empty (with proper message)
    csvResult.message += ' (No data found in CSV file)';
    return NextResponse.json(csvResult);

  } catch (error) {
    console.error('Mandi API error:', error);
    return NextResponse.json({
      prices: [],
      commodity: '',
      state: '',
      district: '',
      message: 'Mandi price fetch failed',
      error: 'Internal server error'
    }, { status: 500 });
  }
}

async function tryGovernmentAPI(commodity: string, state: string, district: string) {
  const API_KEY = process.env.DATA_GOV_API_KEY;
  
  // Build URL with filters
  let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=20&filters[commodity]=${encodeURIComponent(commodity)}&filters[state]=${encodeURIComponent(state)}`;
  
  if (district) {
    url += `&filters[district]=${encodeURIComponent(district)}`;
  }
  
  console.log('Government API URL:', url);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Government API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log('Government API Response:', JSON.stringify(data, null, 2));
  
  // Handle different response formats
  let records = [];
  if (data.records) {
    records = data.records;
  } else if (data.data) {
    records = data.data;
  } else if (Array.isArray(data)) {
    records = data;
  }
  
  // Filter records by commodity, state, and district if we have them
  if (records.length > 0) {    
    records = records.filter((record: MandiRecord) => {
      let matches = true;
      
      if (typeof commodity === 'string' && commodity) {
        const recordCommodity = String(record.commodity || '');
        matches = matches && recordCommodity.toLowerCase().includes(commodity.toLowerCase());
      }
      if (typeof state === 'string' && state) {
        const recordState = String(record.state || '');
        matches = matches && recordState.toLowerCase().includes(state.toLowerCase());
      }
      if (typeof district === 'string' && district) {
        const recordDistrict = String(record.district || '');
        matches = matches && recordDistrict.toLowerCase().includes(district.toLowerCase());
      }
      
      return matches;
    });
  }
  
  if (!records || records.length === 0) {
    return {
      prices: [],
      commodity,
      state,
      district,
      message: `No price data available for "${commodity}" in "${state}".`,
      suggestions: {
        workingCombination: "Tomato + Karnataka",
        availableStates: 10,
        availableCommodities: 120
      }
    };
  }

  // Helper function to parse price safely
  const parsePrice = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    const num = parseFloat(String(value).replace(/[^\d.-]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const prices = records.map((record: MandiRecord) => ({
    market: record.market || record.market_name || 'Unknown Market',
    min: Math.round(parsePrice(record.min_price || record.minPrice) / 10),
    max: Math.round(parsePrice(record.max_price || record.maxPrice) / 10),
    modal: Math.round(parsePrice(record.modal_price || record.modalPrice || record.price) / 10),
    date: record.arrival_date || record.date || record.arrivalDate || new Date().toISOString().split('T')[0]
  }));

  return {
    prices,
    commodity,
    state,
    district,
    message: `Found ${prices.length} price records for ${commodity} in ${state}${district ? `, ${district}` : ''} (Government API)`
  };
}
