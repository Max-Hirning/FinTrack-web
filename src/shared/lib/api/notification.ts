import axios from 'axios';
import { env } from 'src/env';
import axiosInstance from '../axios';
import { ApiError } from 'shared/lib';
import { IFilterNotifications, INotificationResponse, IPaginationResponse } from 'shared/types';

class NotificationService {
  constructor(private url: string) {}

  async getNotifications(query: IFilterNotifications): Promise<IPaginationResponse<INotificationResponse>> {
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

export const notificationService = new NotificationService(`${env.NEXT_PUBLIC_API_URL}/notification`);