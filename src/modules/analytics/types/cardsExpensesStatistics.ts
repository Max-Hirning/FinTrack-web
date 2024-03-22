import {ITransactionsFilters} from "@/modules/transactions";

export interface ICardsExpensesFilters {
  currency: string;
  filters: ITransactionsFilters;
}
export interface ICardsExpensesResponse { 
  color: string;
  label: string;
  amount: number;
}