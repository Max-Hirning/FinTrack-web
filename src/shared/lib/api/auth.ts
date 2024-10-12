import axios from 'axios';
import { env } from 'src/env';
import { ApiError } from 'shared/lib';
import { signUpInput, signInInput, resetPasswordInput, checkCodeInput, sendCodeInput, ISignInResponse } from 'shared/types';
import { signIn } from './server';

class AuthService {
  constructor(private url: string) {}

  async sendCode(data: sendCodeInput): Promise<string> {
    try {
      const response = await axios.post(`${this.url}/request-otp`, data);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
  async signInUser(data: signInInput): Promise<ISignInResponse> {
    try {
      const response = await axios.post(`${this.url}/sign-in`, data);
      const serverResponse = await signIn(response.data as ISignInResponse);
      if(serverResponse.code !== 200) throw new Error(serverResponse.data);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
  async checkCode(data: checkCodeInput & {email: string}): Promise<string> {
    try {
      const response = await axios.post(`${this.url}/check-otp`, data);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
  async signUpUser(data: Omit<signUpInput, "confirmPassword">): Promise<string> {
    try {
      const response = await axios.post(`${this.url}/sign-up`, data);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
  async resetPassword(data: Omit<resetPasswordInput, "confirmPassword"> & {email: string}): Promise<string> {
    try {
      const response = await axios.put(`${this.url}/reset-password`, data);
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const authService = new AuthService(`${env.NEXT_PUBLIC_API_URL}/auth`);