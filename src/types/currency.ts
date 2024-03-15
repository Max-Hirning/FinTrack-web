export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
  rounding: number;
  name_plural: string;
  symbol_native: string;
  decimal_digits: number;
}
export interface ICurrencyResponse<T> {
  rates: T;
  base: string;
  date: string;
  terms: string;
  privacy: string;
  success: boolean;
  timestamp: number;
}