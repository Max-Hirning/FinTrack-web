export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  userId: string;
}