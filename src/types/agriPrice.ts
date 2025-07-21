export interface AgriPriceItem {
  date: string;
  mandi: string;
  minPrice: string;
  maxPrice: string;
  modalPrice: string;
}

export interface AgriPriceResponse {
  crop: string;
  state: string;
  district: string;
  prices: AgriPriceItem[];
  updated?: boolean;
  stale?: boolean;
  message?: string;
  error?: string;
}
