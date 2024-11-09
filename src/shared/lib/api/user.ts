import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IUserResponse, profileInput, preferencesInput, settingsInput } from 'shared/types';

class UserService {
  constructor(private url: string) {}

  async deleteUser(userId: string): Promise<string> {
    try {
      const response = await axiosInstance.delete(`${this.url}/${userId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async getUser(userId: string): Promise<IUserResponse> {
    try {
      const response = await axiosInstance.get(`${this.url}/${userId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateUserPassword(payload: settingsInput, userId: string): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/password/${userId}`, payload);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateUser(payload: profileInput | preferencesInput, userId: string): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/${userId}`, payload);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const userService = new UserService(`${env.NEXT_PUBLIC_API_URL}/user`);