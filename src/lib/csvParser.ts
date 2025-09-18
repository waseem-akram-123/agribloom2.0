import { parse } from 'csv-parse/sync';

export interface MandiPriceRecord {
  market: string;
  commodity: string;
  state: string;
  district: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  arrival_date: string;
  arrival_quantity?: number;
  variety?: string;
}

export function parseMandiCSV(csvContent: string): MandiPriceRecord[] {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      cast: (value, context) => {
        // Convert price fields to numbers
        if (context.column === 'min_price' || context.column === 'max_price' || context.column === 'modal_price' ||
            context.column === 'Min_x0020_Price' || context.column === 'Max_x0020_Price' || context.column === 'Modal_x0020_Price') {
          const num = parseFloat(value.replace(/[^\d.-]/g, ''));
          return isNaN(num) ? 0 : num;
        }
        // Convert arrival quantity to number if present
        if (context.column === 'arrival_quantity') {
          const num = parseFloat(value.replace(/[^\d.-]/g, ''));
          return isNaN(num) ? 0 : num;
        }
        return value;
      }
    });

    return records.map((record: any) => ({
      market: record.market || record.market_name || record.mandi || record.Market || 'Unknown Market',
      commodity: record.commodity || record.crop || record.Commodity || 'Unknown Commodity',
      state: record.state || record.State || 'Unknown State',
      district: record.district || record.District || 'Unknown District',
      min_price: record.min_price || record.minPrice || record.minimum_price || record.Min_x0020_Price || 0,
      max_price: record.max_price || record.maxPrice || record.maximum_price || record.Max_x0020_Price || 0,
      modal_price: record.modal_price || record.modalPrice || record.price || record.average_price || record.Modal_x0020_Price || 0,
      arrival_date: record.arrival_date || record.date || record.arrivalDate || record.Arrival_Date || new Date().toISOString().split('T')[0],
      arrival_quantity: record.arrival_quantity || record.quantity || record.arrival_quantity || 0,
      variety: record.variety || record.type || record.Variety || ''
    }));
  } catch (error) {
    console.error('CSV parsing error:', error);
    throw new Error('Failed to parse CSV data');
  }
}

export function filterMandiData(
  data: MandiPriceRecord[], 
  commodity?: string, 
  state?: string, 
  district?: string
): MandiPriceRecord[] {
  return data.filter(record => {
    let matches = true;
    
    if (commodity) {
      matches = matches && record.commodity.toLowerCase().includes(commodity.toLowerCase());
    }
    if (state) {
      matches = matches && record.state.toLowerCase().includes(state.toLowerCase());
    }
    if (district) {
      matches = matches && record.district.toLowerCase().includes(district.toLowerCase());
    }
    
    return matches;
  });
}

export function getUniqueValues(data: MandiPriceRecord[]) {
  const states = [...new Set(data.map(r => r.state).filter(Boolean))].sort();
  const districts = [...new Set(data.map(r => r.district).filter(Boolean))].sort();
  const commodities = [...new Set(data.map(r => r.commodity).filter(Boolean))].sort();
  const markets = [...new Set(data.map(r => r.market).filter(Boolean))].sort();
  
  return { states, districts, commodities, markets };
}
