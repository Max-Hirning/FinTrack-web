import {ICategory} from "@/types/category";
import {ICardResponse} from "@/modules/cards";

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
  category: Omit<ICategory, "children">;
}
export interface ITransactionListResponse {
  currencies: string[];
  data: ITransactionResponse[];
}