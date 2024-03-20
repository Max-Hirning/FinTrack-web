import {ITransactionsFilters} from "@/modules/transactions";

export interface IYearlyStatisticsFilters {
  currency: string;
  filters: ITransactionsFilters;
}
export interface IYearlyStatisticsResponse { 
  incomes: number;
  expenses: number;
}