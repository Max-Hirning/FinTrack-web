import {IResponse} from "@/types/api";
import {IUserResponse} from "../types/user";
import {ISecurityForm} from "../types/securityForm";

class UserAPI {
  constructor(protected readonly url: string) {}

  async delete(userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "DELETE",
      });
      if(!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getUser(userId: string, token: string): Promise<IResponse<IUserResponse>> {
    try {
      const response = await fetch(`${this.url}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "GET",
      });
      if(!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteAvatar(userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/avatar/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "DELETE",
      });
      if(!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async update(data: FormData, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
        method: "PUT",
      });
      if(!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateSecurity(data: Omit<ISecurityForm, "confirmPassword">, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/security/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      if(!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const userAPI = new UserAPI(`${process.env.NEXT_PUBLIC_URL}/user`);