import {ITransactionsFilters} from "@/modules/transactions/types/transaction";

export interface IMonthlyExpensesStatisticsResponse { 
  [key: string]: number;
}
export interface IMonthlyExpensesStatisticsFilters extends Pick<ITransactionsFilters, "cards"|"date"> {
  currency: string;
}