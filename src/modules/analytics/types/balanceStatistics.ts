import {ITransactionsFilters} from "@/modules/transactions";

export interface IBalanceStatisticsFilters {
  currency: string;
  filters: ITransactionsFilters;
}
export interface IBalanceStatisticsResponse { 
  balance: number;
  cardIds: string[];
}