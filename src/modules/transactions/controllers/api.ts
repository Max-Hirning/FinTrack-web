import {IResponse} from "@/types/api";
import {IPagination} from "@/types/pagination";
import {ITransactionForm} from "@/modules/store";
import {ITransactionsFilters, ITransactionListResponse} from "../types/transaction";

class TransactionsAPI {
  constructor(protected readonly url: string) {}

  async delete(transactionId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${transactionId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "DELETE",
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async create(data: Omit<ITransactionForm, "_id">, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(this.url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async update(data: Omit<ITransactionForm, "_id">, transactionId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${transactionId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async getAll({page, cards, perPage, date}: Partial<ITransactionsFilters>, token: string): Promise<IResponse<IPagination<ITransactionListResponse>>> {
    try {
      const filters: { perPage?: string, page?: string, date?: string, cards?: string } = {};
      if(page && perPage) {
        filters.page = JSON.stringify(page);
        filters.perPage = JSON.stringify(perPage);
      }
      if(date) filters.date = JSON.stringify(date);
      if(cards) filters.cards = JSON.stringify(cards);
      const queryParams = new URLSearchParams(filters as Record<string, string>);
      const response = await fetch(`${this.url}?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      if(!response.ok) throw (response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw (error as string);
    }
  }
}

export const transactionsAPI = new TransactionsAPI(`${process.env.NEXT_PUBLIC_API_URL}/transaction`);