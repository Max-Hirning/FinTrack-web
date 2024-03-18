import {IResponse} from "@/types/api";
import {IAccountFilters, IAccountResponse} from "../types/account";
import {IWeeklyStatisticsResponse} from "../types/weeklyStatistics";
import {IExpensesFilters, IExpensesResponse} from "../types/expenses";
import {ICardsExpensesFilters, ICardsExpensesResponse} from "../types/cardsExpenses";

class AnalyticsAPI {
  constructor(protected readonly url: string) {}

  async getExpenses({currency, filters}: IExpensesFilters, token: string): Promise<IResponse<IExpensesResponse[]>> {
    try {
      if (!(filters && token)) throw new Error("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        filters: JSON.stringify(filters),
      });
      const response = await fetch(`${this.url}/expenses?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        method: "GET",
      });
      if (!response.ok) return ({
        data: [],
        statusCode: 400,
        message: "Something went wrong",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

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
        },
        method: "GET",
      });
      if (!response.ok) return ({
        data: {
          incomes: 0,
          balance: 0,
          expenses: 0,
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

  async getWeeklyStatistics({currency, filters}: IExpensesFilters, token: string): Promise<IResponse<{[key: string]: IWeeklyStatisticsResponse}>> {
    try {
      if (!(filters && token)) throw new Error("No expenses were found");
      const queryParams = new URLSearchParams({
        currency,
        filters: JSON.stringify(filters),
      });
      const response = await fetch(`${this.url}/transactions/weekly?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        method: "GET",
      });
      if (!response.ok) return ({
        data: {},
        statusCode: 400,
        message: "Something went wrong",
      });
      const result = await response.json();
      return result;

      // return ({
      //   statusCode: 200,
      //   message: "",
      //   data: {
      //     '2024-03-18': {incomes: 1038, expenses: 827},
      //     '2024-03-19': {incomes: 87, expenses: 938},
      //     '2024-03-20': {incomes: 384, expenses: 635},
      //     '2024-03-21': {incomes: 43, expenses: 72},
      //     '2024-03-22': {incomes: 9, expenses: 54},
      //     '2024-03-23': {incomes: 0, expenses: 82},
      //     '2024-03-24': {incomes: 0, expenses: 0}
      //   }
      // });
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
        },
        method: "GET",
      });
      if (!response.ok) return ({
        data: [],
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

export const analyticsAPI = new AnalyticsAPI(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api`);