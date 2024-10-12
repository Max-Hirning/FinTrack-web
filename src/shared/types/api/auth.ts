import { IUserResponse } from "shared/types"

interface ISignInResponse {
  accessToken: string;
  user: IUserResponse;
  refreshToken: string;
}

export type {
  ISignInResponse
}