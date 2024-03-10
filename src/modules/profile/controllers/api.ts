import {IResponse} from "@/types/api";
import {IUserResponse} from "../types/user";

class UserAPI {
  constructor(protected readonly url: string) {}

  async getUser(userId: string, token: string): Promise<IResponse<IUserResponse>> {
    try {
      const response = await fetch(`${this.url}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "GET",
        cache: "force-cache",
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