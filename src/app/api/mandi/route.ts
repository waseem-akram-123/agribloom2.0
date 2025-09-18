import { NextRequest, NextResponse } from 'next/server';
import { getMandiPrices } from '@/lib/csvDataLoader';

export async function POST(request: NextRequest) {
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
      
      if (governmentResult.prices && governmentResult.prices.length > 0) {
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
    return NextResponse.json(
      { error: 'Mandi price fetch failed' }, 
      { status: 500 }
    );
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
    records = records.filter((record: any) => {
      let matches = true;
      
      if (commodity) {
        matches = matches && record.commodity && record.commodity.toLowerCase().includes(commodity.toLowerCase());
      }
      if (state) {
        matches = matches && record.state && record.state.toLowerCase().includes(state.toLowerCase());
      }
      if (district) {
        matches = matches && record.district && record.district.toLowerCase().includes(district.toLowerCase());
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

  const prices = records.map((record: any) => ({
    market: record.market || record.market_name || 'Unknown Market',
    min: Math.round((parseInt(record.min_price) || parseInt(record.minPrice) || 0) / 10),
    max: Math.round((parseInt(record.max_price) || parseInt(record.maxPrice) || 0) / 10),
    modal: Math.round((parseInt(record.modal_price) || parseInt(record.modalPrice) || parseInt(record.price) || 0) / 10),
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
