import {IResponse} from "@/types/api";
import {IAccountFilters, IAccountResponse} from "../types/account";
import {ICardsExpensesFilters, ICardsExpensesResponse} from "../types/cardsExpenses";

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
      const response = await fetch(`${this.url}/account?${queryParams.toString()}`, {
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

  async getCardsExpenses({currency, filters}: ICardsExpensesFilters, token: string): Promise<IResponse<ICardsExpensesResponse[]>> {
    try {
      if (!(filters && token)) throw new Error("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        filters: JSON.stringify(filters),
      });
      const response = await fetch(`${this.url}/cards/expenses?${queryParams.toString()}`, {
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

export const analyticsAPI = new AnalyticsAPI(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api`);