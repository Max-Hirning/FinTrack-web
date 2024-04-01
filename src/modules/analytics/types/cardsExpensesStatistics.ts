import {ITransactionsFilters} from "@/modules/transactions";

export interface ICardsExpensesStatisticsResponse { 
  color: string;
  label: string;
  amount: number;
}
export interface ICardsExpensesStatisticsFilters extends Pick<ITransactionsFilters, "cards"|"date"> {
  currency: string;
}