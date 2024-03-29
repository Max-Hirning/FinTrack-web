import {IResponse} from "@/types/api";
import {IAccountFilters, IAccountResponse} from "../types/account";
import {IWeeklyStatisticsResponse} from "../types/weeklyStatistics";
import {IYearlyStatisticsResponse} from "../types/yearlyStatistics";
import {IExpensesFilters, IExpensesResponse} from "../types/expensesStatistics";
import {ICardsExpensesFilters, ICardsExpensesResponse} from "../types/cardsExpensesStatistics";

class AnalyticsAPI {
  constructor(protected readonly url: string) {}

  async getExpenses({currency, filters}: IExpensesFilters, token: string): Promise<IResponse<IExpensesResponse[]>> {
    try {
      if(!(filters && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        filters: JSON.stringify(filters),
      });
      const response = await fetch(`${this.url}/expenses?${queryParams.toString()}`, {
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

  async getAccountInfo({currency, cards, transactions}: IAccountFilters, token: string): Promise<IResponse<IAccountResponse>> {
    try {
      if(!(cards && transactions && token)) throw ("No account info was found");
      const queryParams = new URLSearchParams({
        currency,
        cards: JSON.stringify(cards),
        transactions: JSON.stringify(transactions),
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

  async getCardsExpenses({currency, filters}: ICardsExpensesFilters, token: string): Promise<IResponse<ICardsExpensesResponse[]>> {
    try {
      if(!(filters && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        filters: JSON.stringify(filters),
      });
      const response = await fetch(`${this.url}/cards/expenses?${queryParams.toString()}`, {
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

  async getWeeklyStatistics({currency, filters}: IExpensesFilters, token: string): Promise<IResponse<{[key: string]: IWeeklyStatisticsResponse}>> {
    try {
      if(!(filters && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        filters: JSON.stringify(filters),
      });
      const response = await fetch(`${this.url}/transactions/weekly?${queryParams.toString()}`, {
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

  async getYearlyStatistics({currency, filters}: IExpensesFilters, token: string): Promise<IResponse<{[key: string]: IYearlyStatisticsResponse}>> {
    try {
      if(!(filters && token)) throw ("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        filters: JSON.stringify(filters),
      });
      const response = await fetch(`${this.url}/transactions/yearly?${queryParams.toString()}`, {
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

export const analyticsAPI = new AnalyticsAPI(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api`);