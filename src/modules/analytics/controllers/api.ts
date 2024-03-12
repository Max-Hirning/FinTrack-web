import {IResponse} from "@/types/api";
import {IAccountFilters, IAccountResponse} from "../types/account";

class AnalyticsAPI {
  constructor(protected readonly url: string) {}

  async getAccountInfo({currency, cards, transactions}: IAccountFilters, token: string): Promise<IResponse<IAccountResponse>> {
    try {
      if (!(cards && transactions && token)) throw new Error("No account info was found");
      const queryParams = new URLSearchParams({
        currency,
        cards: JSON.stringify(cards),
        transactions: JSON.stringify(transactions),
      });
      const response = await fetch(`${this.url}?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const analyticsAPI = new AnalyticsAPI(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/account`);