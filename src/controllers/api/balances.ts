import {IResponse} from "@/types/api";
import {IBalancesFilters, IBalancesListResponse} from "@/types/balances";

class BalancesAPI {
  constructor(protected readonly url: string) {}

  async getAll({cards, date}: IBalancesFilters, token: string): Promise<IResponse<IBalancesListResponse>> {
    try {
      if (!(cards && date && token)) throw new Error("No balances were found");
      const queryParams = new URLSearchParams({
        date: JSON.stringify(date),
        cards: JSON.stringify(cards),
      });
      const response = await fetch(`${this.url}?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      if (!response.ok) return ({
        data: {
          data: [],
          currencies: [],
        },
        statusCode: 400,
        message: "Something went wrong",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const balancesAPI = new BalancesAPI(`${process.env.NEXT_PUBLIC_URL}/balance`);