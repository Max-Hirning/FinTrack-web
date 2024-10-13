import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IFilterBudgets, IBudgetResponse, IPaginationResponse, budgetInput } from 'shared/types';

class BudgetService {
  constructor(private url: string) {}

  async deleteBudget(budgetId: string): Promise<string> {
    try {
      const response = await axiosInstance.delete(`${this.url}/${budgetId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getBudget(budgetId?: string): Promise<IBudgetResponse | null> {
    try {
      if(budgetId) {
        const response = await axiosInstance.get(`${this.url}/${budgetId}`);
        return response.data;
      }
      return null;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async createBudget({balance, ...payload}: budgetInput): Promise<string> {
    try {
      const response = await axiosInstance.post(this.url, {...payload, balance: +balance});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getBudgets(query: IFilterBudgets): Promise<IPaginationResponse<IBudgetResponse>> {
    try {
      const response = await axiosInstance.get(this.url, {
        params: query,
      });
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateBudget({balance, ...payload}: budgetInput, budgetId: string): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/${budgetId}`, {...payload, balance: +balance});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const budgetService = new BudgetService(`${env.NEXT_PUBLIC_API_URL}/budget`);