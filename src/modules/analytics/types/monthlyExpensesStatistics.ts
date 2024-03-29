import {ITransactionsFilters} from "@/modules/transactions";

export interface IMonthlyExpensesStatisticsFilters {
  currency: string;
  filters: ITransactionsFilters;
}
export interface IMonthlyExpensesStatisticsResponse { 
  incomes: number;
  expenses: number;
}