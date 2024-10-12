import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { signUpInput, signInInput, resetPasswordInput, checkCodeInput, sendCodeInput, ISignInResponse, IUserResponse } from 'shared/types';

class UserService {
  constructor(private url: string) {}

  async getUser(userId: string): Promise<IUserResponse> {
    try {
      const response = await axiosInstance.get(`${this.url}/${userId}`);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const userService = new UserService(`${env.NEXT_PUBLIC_API_URL}/user`);