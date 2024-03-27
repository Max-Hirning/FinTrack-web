import {IResponse} from "@/types/api";
import {ISignUp} from "../types/signUp";
import {ISignIn, ISignInResponse} from "../types/signIn";

class AuthAPI {
  constructor(protected readonly url: string) {}

  async signIn(data: ISignIn): Promise<IResponse<ISignInResponse>> {
    try {
      const response = await fetch(`${this.url}/sign-in`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify(data),
      }); 
      if(!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async signUp(data: Omit<ISignUp, "confirmPassword">): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/sign-up`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify(data),
      }); 
      if(!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const authAPI = new AuthAPI(`${process.env.NEXT_PUBLIC_API_URL}/auth`);