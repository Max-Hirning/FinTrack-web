import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IFilterGoals, IGoalResponse, IPaginationResponse, goalInput } from 'shared/types';

class GoalService {
  constructor(private url: string) {}

  async deleteGoal(goalId: string): Promise<string> {
    try {
      const response = await axiosInstance.delete(`${this.url}/${goalId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getGoal(goalId?: string): Promise<IGoalResponse | null> {
    try {
      if(goalId) {
        const response = await axiosInstance.get(`${this.url}/${goalId}`);
        return response.data;
      }
      return null;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async createGoal({amount, balance, ...payload}: goalInput): Promise<string> {
    try {
      const response = await axiosInstance.post(this.url, {...payload, amount: +amount, balance: +balance});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateGoal({amount, balance, ...payload}: goalInput, goalId: string): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/${goalId}`, {...payload, amount: +amount, balance: +balance});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getGoals(query: IFilterGoals): Promise<IPaginationResponse<IGoalResponse>> {
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

export const goalService = new GoalService(`${env.NEXT_PUBLIC_API_URL}/goal`);