import {IResponse} from "@/types/api";
import {ISignUp} from "../types/signUp";
import {IResetPassword} from "../types/resetPassword";
import {IForgotPassword} from "../types/forgotPassword";
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
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async forgotPassword(data: IForgotPassword): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/email-request`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({...data, url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/auth/reset-password`}),
      }); 
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
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
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async resetPassword(data: IResetPassword, code: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/reset-password`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({password: data.password, code}),
      }); 
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }
}

export const authAPI = new AuthAPI(`${process.env.NEXT_PUBLIC_API_URL}/auth`);