import axios from 'axios';
import { env } from 'src/env';
import { ApiError } from 'shared/lib';
import { ICategoryResponse } from 'shared/types';

class CategoryService {
  constructor(private url: string) {}

  async getCategories(userIds: string[]): Promise<ICategoryResponse[]> {
    try {
      const response = await axios.get(this.url, {
        params: {
          userIds
        },
      });
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? ApiError.fromAxiosError(error) : ApiError.default();
    }
  }
}

export const categoryService = new CategoryService(`${env.NEXT_PUBLIC_API_URL}/category`);