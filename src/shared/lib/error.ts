import { AxiosError } from 'axios';

export class ApiError extends Error {
  data: unknown;
  status: number;
  headers: unknown;

  constructor(message: string, status: number, data: unknown, headers: unknown) {
    super(message);
    this.data = data;
    this.status = status;
    this.name = 'ApiError';
    this.headers = headers;
  }

  static default(): ApiError {
    return new ApiError('An unexpected error occurred', 500, 'An unexpected error occurred', {});
  }
  static fromAxiosError(error: AxiosError): ApiError {
    const status = error.response?.status || 500;
    const headers = error.response?.headers || {};
    const data = error.response?.data || 'An error occurred';
    return new ApiError(`Request failed with status ${status}`, status, data, headers);
  }
}