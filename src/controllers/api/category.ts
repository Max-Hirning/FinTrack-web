import {IResponse} from "@/types/api";
import {ICategoryResponse} from "@/types/category";

class CategoryAPI {
  constructor(protected readonly url: string) {}

  async getAll(): Promise<IResponse<ICategoryResponse[]>> {
    try {
      const response = await fetch(this.url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
        cache: "force-cache",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }
}

export const categoryAPI = new CategoryAPI(`${process.env.NEXT_PUBLIC_URL}/category`);