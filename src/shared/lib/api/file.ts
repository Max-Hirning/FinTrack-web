import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';

class FileService {
  constructor(private url: string) {}

  async deleteProfileAvatar(): Promise<string> {
    try {
      const response = await axiosInstance.delete(`${this.url}/user`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }

  async updateProfileAvatar(data: FormData): Promise<string> {
    try {
      const response = await axiosInstance.put(`${this.url}/user`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const fileService = new FileService(`${env.NEXT_PUBLIC_API_URL}/file`);