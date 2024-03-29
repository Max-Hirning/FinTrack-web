import {IResponse} from "@/types/api";
import {IUserResponse} from "../types/user";
import {ISecurityForm} from "../types/securityForm";
import {IContactUsForm} from "../types/contactUsFrom";

class UserAPI {
  constructor(protected readonly url: string) {}

  async delete(userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async getUser(userId: string, token: string): Promise<IResponse<IUserResponse>> {
    try {
      const response = await fetch(`${this.url}/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async deleteAvatar(userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/avatar/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async update(data: FormData, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/profile/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: data,
        method: "PUT",
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async contactUs(data: IContactUsForm, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({...data, userId}),
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async updateSecurity(data: Omit<ISecurityForm, "confirmPassword">, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/security/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }
}

export const userAPI = new UserAPI(`${process.env.NEXT_PUBLIC_API_URL}/user`);