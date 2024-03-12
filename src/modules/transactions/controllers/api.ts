import {IResponse} from "@/types/api";
import {IPagination} from "@/types/pagination";
import {ITransactionsFilters, ITransactionResponse} from "../types/transaction";

class TransactionsAPI {
  constructor(protected readonly url: string) {}

  async getAll({page, cards, dates}: ITransactionsFilters, token: string): Promise<IResponse<IPagination<ITransactionResponse>>> {
    try {
      const queryParams = new URLSearchParams({
        page: JSON.stringify(page),
        cards: JSON.stringify(cards),
        dates: JSON.stringify(dates),
      });
      const response = await fetch(`${this.url}?${queryParams.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "GET",
      });
      if(!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const transactionsAPI = new TransactionsAPI(`${process.env.NEXT_PUBLIC_URL}/transaction`);