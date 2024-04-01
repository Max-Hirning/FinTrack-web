import {ITransactionsFilters} from "@/modules/transactions";

export interface IAccountStatisticsResponse {
  incomes: number;
  balance: number;
  expenses: number;
}
export interface IAccountStatisticsFilters extends Pick<ITransactionsFilters, "cards"|"date"> {
  currency: string;
}