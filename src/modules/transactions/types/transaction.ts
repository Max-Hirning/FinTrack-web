import {ICardResponse} from "@/modules/cards";
import {ICategoryResponse} from "@/types/category";

export interface ITransactionsFilters {
  page?: number;
  cards: string[];
  perPage?: number;
  date: [string, string];
}
export interface ITransactionResponse {
  _id: string;
  date: string;
  amount: number;
  description: string;
  card: ICardResponse;
  category: Omit<ICategoryResponse, "children">;
}
export interface ITransactionListResponse {
  currencies: string[];
  data: ITransactionResponse[];
}