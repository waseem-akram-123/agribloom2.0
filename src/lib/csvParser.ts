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

    interface RawRecord {
      [key: string]: string | number | undefined;
    }
    
    return (records as RawRecord[]).map((record): MandiPriceRecord => {
      // Helper function to safely convert string to number
      const toNumber = (value: string | number | undefined): number => {
        if (typeof value === 'number') return value;
        if (!value) return 0;
        const num = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
        return isNaN(num) ? 0 : num;
      };

      // Helper function to get first defined value from multiple possible keys
      const getFirstDefined = (...keys: string[]): string => {
        for (const key of keys) {
          const value = record[key];
          if (value !== undefined && value !== null && value !== '') {
            return value.toString();
          }
        }
        return '';
      };

      // Get today's date in YYYY-MM-DD format for default arrival date
      const defaultDate = new Date().toISOString().split('T')[0];

      const mandiRecord: MandiPriceRecord = {
        market: getFirstDefined('market', 'market_name', 'mandi', 'Market') || 'Unknown Market',
        commodity: getFirstDefined('commodity', 'crop', 'Commodity') || 'Unknown Commodity',
        state: getFirstDefined('state', 'State') || 'Unknown State',
        district: getFirstDefined('district', 'District') || 'Unknown District',
        min_price: toNumber(record.min_price || record.minPrice || record.minimum_price || record.Min_x0020_Price),
        max_price: toNumber(record.max_price || record.maxPrice || record.maximum_price || record.Max_x0020_Price),
        modal_price: toNumber(record.modal_price || record.modalPrice || record.price || record.average_price || record.Modal_x0020_Price),
        arrival_date: getFirstDefined('arrival_date', 'date', 'arrivalDate', 'Arrival_Date') || defaultDate,
        arrival_quantity: toNumber(record.arrival_quantity || record.quantity),
        variety: getFirstDefined('variety', 'type', 'Variety')
      };

      return mandiRecord;
    });
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
