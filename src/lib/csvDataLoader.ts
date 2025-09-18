import fs from 'fs';
import path from 'path';
import { parseMandiCSV, MandiPriceRecord, filterMandiData, getUniqueValues } from './csvParser';

let cachedData: MandiPriceRecord[] | null = null;
let lastModified: number | null = null;

export async function loadMandiCSVData(): Promise<MandiPriceRecord[]> {
  const csvPath = path.join(process.cwd(), 'src/data/csv/mandi-data.csv');
  
  try {
    // Check if file exists
    if (!fs.existsSync(csvPath)) {
      console.log('CSV file not found, using sample data');
      return loadSampleData();
    }

    // Check file modification time for caching
    const stats = fs.statSync(csvPath);
    const currentModified = stats.mtime.getTime();
    
    // Return cached data if file hasn't changed
    if (cachedData && lastModified === currentModified) {
      console.log('Returning cached CSV data');
      return cachedData;
    }

    // Read and parse CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const data = parseMandiCSV(csvContent);
    
    // Cache the data
    cachedData = data;
    lastModified = currentModified;
    
    console.log(`Loaded ${data.length} records from CSV file`);
    return data;
    
  } catch (error) {
    console.error('Error loading CSV data:', error);
    console.log('Falling back to sample data');
    return loadSampleData();
  }
}

function loadSampleData(): MandiPriceRecord[] {
  const samplePath = path.join(process.cwd(), 'src/data/csv/sample-mandi-data.csv');
  
  try {
    const csvContent = fs.readFileSync(samplePath, 'utf-8');
    const data = parseMandiCSV(csvContent);
    console.log(`Loaded ${data.length} sample records`);
    return data;
  } catch (error) {
    console.error('Error loading sample data:', error);
    return [];
  }
}

export async function getMandiPrices(
  commodity?: string, 
  state?: string, 
  district?: string
): Promise<{
  prices: any[];
  commodity: string;
  state: string;
  district: string;
  message: string;
  suggestions?: any;
}> {
  try {
    const allData = await loadMandiCSVData();
    
    if (allData.length === 0) {
      return {
        prices: [],
        commodity: commodity || '',
        state: state || '',
        district: district || '',
        message: 'No mandi data available. Please upload a CSV file with mandi price data.',
        suggestions: {
          workingCombination: "Tomato + Karnataka",
          availableStates: 0,
          availableCommodities: 0
        }
      };
    }

    // Filter data based on parameters
    const filteredData = filterMandiData(allData, commodity, state, district);
    
    if (filteredData.length === 0) {
      const uniqueValues = getUniqueValues(allData);
      
      let suggestionMessage = `No price data available for "${commodity}" in "${state}".`;
      
      if (district) {
        suggestionMessage += ` No data found for district "${district}".`;
      }
      
      suggestionMessage += `\n\n💡 **Available Data:**`;
      suggestionMessage += `\n• States: ${uniqueValues.states.slice(0, 5).join(', ')}${uniqueValues.states.length > 5 ? ` and ${uniqueValues.states.length - 5} more` : ''}`;
      suggestionMessage += `\n• Commodities: ${uniqueValues.commodities.slice(0, 5).join(', ')}${uniqueValues.commodities.length > 5 ? ` and ${uniqueValues.commodities.length - 5} more` : ''}`;
      
      return {
        prices: [],
        commodity: commodity || '',
        state: state || '',
        district: district || '',
        message: suggestionMessage,
        suggestions: {
          workingCombination: `${uniqueValues.commodities[0]} + ${uniqueValues.states[0]}`,
          availableStates: uniqueValues.states.length,
          availableCommodities: uniqueValues.commodities.length
        }
      };
    }

    // Convert to API format
    const prices = filteredData.map(record => ({
      market: record.market,
      min: Math.round(record.min_price / 10), // Convert to realistic prices
      max: Math.round(record.max_price / 10),
      modal: Math.round(record.modal_price / 10),
      date: record.arrival_date
    }));

    return {
      prices,
      commodity: commodity || '',
      state: state || '',
      district: district || '',
      message: `Found ${prices.length} price records for ${commodity} in ${state}${district ? `, ${district}` : ''}`
    };

  } catch (error) {
    console.error('Error getting mandi prices:', error);
    throw new Error('Failed to fetch mandi prices from CSV data');
  }
}

export async function getMandiMetadata(): Promise<{
  states: string[];
  districts: string[];
  commodities: string[];
  markets: string[];
  districtsByState: { [state: string]: string[] };
  totalRecords: number;
}> {
  try {
    const allData = await loadMandiCSVData();
    const uniqueValues = getUniqueValues(allData);
    
    // Create districts by state mapping
    const districtsByState: { [state: string]: string[] } = {};
    allData.forEach(record => {
      if (!districtsByState[record.state]) {
        districtsByState[record.state] = [];
      }
      if (!districtsByState[record.state].includes(record.district)) {
        districtsByState[record.state].push(record.district);
      }
    });
    
    // Sort districts for each state
    Object.keys(districtsByState).forEach(state => {
      districtsByState[state].sort();
    });
    
    return {
      states: uniqueValues.states,
      districts: uniqueValues.districts,
      commodities: uniqueValues.commodities,
      markets: uniqueValues.markets,
      districtsByState,
      totalRecords: allData.length
    };
  } catch (error) {
    console.error('Error getting mandi metadata:', error);
    return {
      states: [],
      districts: [],
      commodities: [],
      markets: [],
      districtsByState: {},
      totalRecords: 0
    };
  }
}
