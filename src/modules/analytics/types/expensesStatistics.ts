import {ITransactionsFilters} from "@/modules/transactions";

export interface IExpensesFilters {
  currency: string;
  filters: ITransactionsFilters;
}
export interface IExpensesResponse { 
  color: string;
  label: string;
  amount: number;
}