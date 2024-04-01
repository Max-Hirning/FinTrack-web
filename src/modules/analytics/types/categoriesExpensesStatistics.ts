import {ITransactionsFilters} from "@/modules/transactions";

export interface ICategoriesExpensesStatisticsResponse { 
  color: string;
  label: string;
  amount: number;
}
export interface ICategoriesExpensesStatisticsFilters extends Pick<ITransactionsFilters, "cards"|"date"> {
  currency: string;
}