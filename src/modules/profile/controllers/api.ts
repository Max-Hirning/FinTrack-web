import {IResponse} from "@/types/api";
import {IUserResponse} from "../types/user";
import {ISecurityForm} from "../types/securityForm";
import {ISettingsForm} from "../types/settingsForm";
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

  async update(data: ISettingsForm, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const formData: FormData = new FormData();
      (data.image) && formData.append("file", data.image);
      (data.email.length > 0) && formData.append("email", data.email);
      (data.lastName.length > 0) && formData.append("lastName", data.lastName);
      (data.currency.length > 0) && formData.append("currency", data.currency);
      (data.firstName.length > 0) && formData.append("firstName", data.firstName);
      const response = await fetch(`${this.url}/profile/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        method: "PUT",
        body: formData,
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