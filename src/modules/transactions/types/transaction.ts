import {ICardResponse} from "@/modules/cards";
import {ITransactionCategoryResponse} from "./transactionCategory";

export interface ITransactionsFilters {
  page?: number;
  cards: string[];
  dates: [string, string];
}

export interface ITransactionResponse {
  id: string;
  date: string;
  ammount: number;
  description: string;
  card: ICardResponse;
  category: ITransactionCategoryResponse;
}