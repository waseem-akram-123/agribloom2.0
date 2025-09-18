import { NextRequest, NextResponse } from 'next/server';
import { getMandiMetadata } from '@/lib/csvDataLoader';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching mandis metadata...');
    
    // Use CSV data as primary source (more accurate)
    console.log('📊 Using CSV data as primary source');
    const metadata = await getMandiMetadata();
    
    if (metadata.totalRecords > 0) {
      console.log('✅ CSV data loaded successfully');
      return NextResponse.json({
        mandis: [], // We don't return individual records here, just metadata
        states: metadata.states,
        districts: metadata.districts,
        commodities: metadata.commodities,
        markets: metadata.markets,
        districtsByState: metadata.districtsByState,
        totalRecords: metadata.totalRecords,
        message: `Loaded ${metadata.totalRecords} mandi records with ${metadata.states.length} states, ${metadata.districts.length} districts, and ${metadata.commodities.length} commodities (CSV data)`
      });
    }

    // Fallback to Government API if CSV fails
    console.log('⚠️ CSV data not available, trying Government API...');
    try {
      const governmentResult = await tryGovernmentMandisAPI();
      
      if (governmentResult.totalRecords > 0) {
        console.log('✅ Government API successful as fallback');
        return NextResponse.json(governmentResult);
      }
    } catch (apiError) {
      console.log('❌ Government API also failed:', apiError);
    }

    return NextResponse.json({ 
      mandis: [],
      states: [],
      districts: [],
      commodities: [],
      markets: [],
      totalRecords: 0,
      message: 'No mandi data available from both CSV and API sources.'
    });

  } catch (error) {
    console.error('Mandis list API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mandis list' }, 
      { status: 500 }
    );
  }
}

async function tryGovernmentMandisAPI() {
  const API_KEY = process.env.DATA_GOV_API_KEY;
  
  // Get all mandis without filters first
  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1000`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Government API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log(`Government API fetched ${data.records?.length || 0} mandi records`);
  
  if (!data.records || data.records.length === 0) {
    return {
      mandis: [],
      states: [],
      districts: [],
      commodities: [],
      markets: [],
      totalRecords: 0,
      message: 'No mandi data available from government API'
    };
  }

  // Extract unique values
  const uniqueStates = [...new Set(data.records.map((r: any) => r.state).filter(Boolean))].sort();
  const uniqueDistricts = [...new Set(data.records.map((r: any) => r.district).filter(Boolean))].sort();
  const uniqueCommodities = [...new Set(data.records.map((r: any) => r.commodity).filter(Boolean))].sort();
  const uniqueMarkets = [...new Set(data.records.map((r: any) => r.market || r.market_name).filter(Boolean))].sort();
  
  // Group mandis by state and district
  const mandisByState: { [key: string]: any[] } = {};
  const mandisByDistrict: { [key: string]: any[] } = {};
  
  data.records.forEach((record: any) => {
    const state = record.state;
    const district = record.district;
    
    if (!mandisByState[state]) {
      mandisByState[state] = [];
    }
    if (!mandisByDistrict[district]) {
      mandisByDistrict[district] = [];
    }
    
    // Add unique markets
    const existingMarket = mandisByState[state].find(m => m.market === record.market);
    if (!existingMarket) {
      mandisByState[state].push({
        market: record.market,
        district: record.district,
        state: record.state
      });
    }
    
    const existingDistrictMarket = mandisByDistrict[district].find(m => m.market === record.market);
    if (!existingDistrictMarket) {
      mandisByDistrict[district].push({
        market: record.market,
        district: record.district,
        state: record.state
      });
    }
  });

  return {
    mandis: data.records,
    states: uniqueStates,
    districts: uniqueDistricts,
    commodities: uniqueCommodities,
    markets: uniqueMarkets,
    mandisByState,
    mandisByDistrict,
    totalRecords: data.records.length,
    message: `Found ${uniqueStates.length} states, ${uniqueDistricts.length} districts, and ${uniqueCommodities.length} commodities (Government API)`
  };
}
