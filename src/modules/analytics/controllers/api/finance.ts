import {IResponse} from "@/types/api";
import {IAccountStatisticsFilters, IAccountStatisticsResponse} from "../../types/accountStatistics";
import {ITransactionsStatisticsFilters, ITransactionsStatisticsResponse} from "../../types/transactionsStatistics";
import {ICardsExpensesStatisticsFilters, ICardsExpensesStatisticsResponse} from "../../types/cardsExpensesStatistics";
import {IMonthlyExpensesStatisticsFilters, IMonthlyExpensesStatisticsResponse} from "../../types/monthlyExpensesStatistics";
import {ICategoriesExpensesStatisticsFilters, ICategoriesExpensesStatisticsResponse} from "../../types/categoriesExpensesStatistics";

class AnalyticsAPI {
  constructor(protected readonly url: string) {}

  async getAccountInfo({currency, cards, date}: IAccountStatisticsFilters, token: string): Promise<IResponse<IAccountStatisticsResponse>> {
    try {
      if(!(cards && date && token)) throw ("No account info was found");
      const queryParams = new URLSearchParams({
        currency,
        date: JSON.stringify(date),
        cards: JSON.stringify(cards),
      });
      const response = await fetch(`${this.url}/account?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async getMonthlyExpensesStatistics({currency, cards, date}: IMonthlyExpensesStatisticsFilters, token: string): Promise<IResponse<IMonthlyExpensesStatisticsResponse>> {
    try {
      if(!(cards && currency && date && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        date: JSON.stringify(date),
        cards: JSON.stringify(cards),
      });
      const response = await fetch(`${this.url}/expenses/monthly?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async getCardsExpenses({currency, cards, date}: ICardsExpensesStatisticsFilters, token: string): Promise<IResponse<{[key: string]: ICardsExpensesStatisticsResponse}>> {
    try {
      if(!(cards && currency && date && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        date: JSON.stringify(date),
        cards: JSON.stringify(cards),
      });
      const response = await fetch(`${this.url}/expenses/cards?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async getCategoriesExpenses({currency, cards, date}: ICategoriesExpensesStatisticsFilters, token: string): Promise<IResponse<{[key: string]: ICategoriesExpensesStatisticsResponse}>> {
    try {
      if(!(cards && date && currency && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        date: JSON.stringify(date),
        cards: JSON.stringify(cards),
      });
      const response = await fetch(`${this.url}/expenses/categories?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async getTransactionsStatistics({currency, frequency, cards, date}: ITransactionsStatisticsFilters, token: string): Promise<IResponse<{[key: string]: ITransactionsStatisticsResponse}>> {
    try {
      if(!(cards && date && currency && frequency && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        frequency,
        date: JSON.stringify(date),
        cards: JSON.stringify(cards),
      });
      const response = await fetch(`${this.url}/transactions?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }
}

export const analyticsAPI = new AnalyticsAPI(`${process.env.NEXT_PUBLIC_API_URL}/analytics`);