import {ITransactionsFilters} from "@/modules/transactions";

export interface ITransactionsStatisticsResponse { 
  incomes: number;
  expenses: number;
}
export interface ITransactionsStatisticsFilters extends Pick<ITransactionsFilters, "cards"|"date"> {
  currency: string;
  frequency: "d"|"m";
}