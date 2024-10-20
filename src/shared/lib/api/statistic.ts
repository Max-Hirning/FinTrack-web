import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IFilterStatistic, IAccountStatisticResponse, IStatisticCaregoriesResponse, IStatisticResponse } from 'shared/types';

class StatisticService {
  constructor(private url: string) {}

  async getAccount(userId: string): Promise<IAccountStatisticResponse> {
    try {
      const response = await axiosInstance.get(`${this.url}/account/${userId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getStatistic(query: IFilterStatistic): Promise<IStatisticResponse[]> {
    try {
      const response = await axiosInstance.get(`${this.url}`, {
        params: query
      });
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

    async getCards(query: IFilterStatistic): Promise<IStatisticCaregoriesResponse[]> {
    try {
      const response = await axiosInstance.get(`${this.url}/cards`, {
        params: query
      });
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getCategories(query: IFilterStatistic): Promise<IStatisticCaregoriesResponse[]> {
    try {
      const response = await axiosInstance.get(`${this.url}/categories`, {
        params: query
      });
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const statisticService = new StatisticService(`${env.NEXT_PUBLIC_API_URL}/statistic`);