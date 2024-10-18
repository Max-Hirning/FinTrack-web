import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IFilterTransactions, ITransactionResponse, IPaginationResponse, transactionInput } from 'shared/types';

class TransactionService {
  constructor(private url: string) {}

  async deleteTransaction(transactionId: string): Promise<string> {
    try {
      const response = await axiosInstance.delete(`${this.url}/${transactionId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getTransaction(transactionId?: string): Promise<ITransactionResponse | null> {
    try {
      if(transactionId) {
        const response = await axiosInstance.get(`${this.url}/${transactionId}`);
        return response.data;
      }
      return null;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async createTransaction({amount, ...payload}: transactionInput): Promise<string> {
    try {
      const response = await axiosInstance.post(this.url, {...payload, amount: +amount});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateTransaction({amount, ...payload}: transactionInput, transactionId: string): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/${transactionId}`, {...payload, amount: +amount});
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getTransactions(query: IFilterTransactions): Promise<IPaginationResponse<ITransactionResponse>> {
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

export const transactionService = new TransactionService(`${env.NEXT_PUBLIC_API_URL}/transaction`);