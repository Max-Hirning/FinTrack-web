import {ICardResponse} from "@/modules/cards";

export interface IBalancesFilters {
  cards: string[];
  date: [string, string];
}
export interface IBalanceResponse {
  _id: string;
  date: string;
  balance: number;
  card: ICardResponse;
}
export interface IBalancesListResponse {
  currencies: string[];
  data: IBalanceResponse[];
}