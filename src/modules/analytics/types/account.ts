import {ICardsFilters} from "@/modules/cards";
import {ITransactionsFilters} from "@/modules/transactions";

export interface IAccountFilters {
  currency: string;
  transactions: ITransactionsFilters;
  cards: Pick<ICardsFilters, "cards">;
}
export interface IAccountResponse {
  incomes: number;
  balance: number;
  expenses: number;
}