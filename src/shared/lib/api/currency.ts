import axios from 'axios';
import { env } from 'src/env';
import { ApiError } from 'shared/lib';
import { ICurrencyResponse } from 'shared/types';

class CurrencyService {
  constructor(private url: string) {}

  async getCurrencies(): Promise<ICurrencyResponse[]> {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const currencyService = new CurrencyService(`${env.NEXT_PUBLIC_API_URL}/currency`);