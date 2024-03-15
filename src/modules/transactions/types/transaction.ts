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
  amount: number;
  description: string;
  card: ICardResponse;
  category: ITransactionCategoryResponse;
}
export interface ITransactionListResponse {
  currencies: string[];
  data: ITransactionResponse[];
}