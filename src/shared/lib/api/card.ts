import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IFilterCards, ICardResponse, IPaginationResponse, cardInput } from 'shared/types';

class CardService {
  constructor(private url: string) {}

  async deleteCard(cardId: string): Promise<string> {
    try {
      const response = await axiosInstance.delete(`${this.url}/${cardId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getCard(cardId?: string): Promise<ICardResponse | null> {
    try {
      if(cardId) {
        const response = await axiosInstance.get(`${this.url}/${cardId}`);
        return response.data;
      }
      return null;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async createCard({startBalance, ...payload}: cardInput): Promise<string> {
    try {
      const response = await axiosInstance.post(this.url, {...payload, startBalance: +startBalance});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateCard(payload: cardInput, cardId: string): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/${cardId}`, payload);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getCards(query: IFilterCards): Promise<IPaginationResponse<ICardResponse>> {
    try {
      const response = await axiosInstance.get(this.url, {
        params: query,
      });
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const cardService = new CardService(`${env.NEXT_PUBLIC_API_URL}/card`);