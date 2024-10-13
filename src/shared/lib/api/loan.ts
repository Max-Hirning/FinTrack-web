import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IFilterLoans, ILoanResponse, IPaginationResponse, loanInput } from 'shared/types';

class LoanService {
  constructor(private url: string) {}

  async deleteLoan(loanId: string): Promise<string> {
    try {
      const response = await axiosInstance.delete(`${this.url}/${loanId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getLoan(loanId?: string): Promise<ILoanResponse | null> {
    try {
      if(loanId) {
        const response = await axiosInstance.get(`${this.url}/${loanId}`);
        return response.data;
      }
      return null;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async createLoan({amount, ...payload}: loanInput): Promise<string> {
    try {
      const response = await axiosInstance.post(this.url, {...payload, amount: +amount});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateLoan({amount, ...payload}: loanInput, loanId: string): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/${loanId}`, {...payload, amount: +amount});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getLoans(query: IFilterLoans): Promise<IPaginationResponse<ILoanResponse>> {
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

export const loanService = new LoanService(`${env.NEXT_PUBLIC_API_URL}/loan`);