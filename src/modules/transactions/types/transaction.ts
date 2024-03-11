import {ICardsResponse} from "@/modules/cards";
import {ITransactionCategoryResponse} from "./transactionCategory";

export interface IFilters {
  page?: number;
  cards: string[];
  dates: [string, string];
}

export interface ITransactionResponse {
  id: string;
  date: string;
  ammount: number;
  description: string;
  card: ICardsResponse;
  category: ITransactionCategoryResponse;
}