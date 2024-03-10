import {IResponse} from "@/types/api";
import {ICurrency} from "@/types/currency";

class CurrencyAPI {
  constructor(protected readonly url: string) {}

  async getAll(): Promise<IResponse<ICurrency[]>> {
    try {
      const response = await fetch(this.url, {
        headers: {
          "Content-Type": "application/json",
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

export const currencyAPI = new CurrencyAPI(`${process.env.NEXT_PUBLIC_URL}/currencies`);