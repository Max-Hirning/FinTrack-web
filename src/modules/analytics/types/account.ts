import {ICardsFilters} from "@/modules/cards";
import {ITransactionsFilters} from "@/modules/transactions";

export interface IAccountFilters {
  currency: string;
  cards: ICardsFilters;
  transactions: ITransactionsFilters;
}
export interface IAccountResponse {
  incomes: number;
  balance: number;
  expenses: number;
}