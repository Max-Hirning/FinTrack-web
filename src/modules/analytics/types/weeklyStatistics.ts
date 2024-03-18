import {ITransactionsFilters} from "@/modules/transactions";

export interface IWeeklyStatisticsFilters {
  currency: string;
  filters: ITransactionsFilters;
}
export interface IWeeklyStatisticsResponse { 
  incomes: number;
  expenses: number
}