import {IUserResponse} from "@/modules/profile";

export interface ICardsFilters {
  cards: string[];
  ownerId: string;
}
export interface ICardResponse {
  _id: string;
  color: string;
  title: string;
  balance: number;
  currency: string;
  owner: Omit<IUserResponse, "cardIds"> & Partial<Pick<IUserResponse, "avatar">>;
}
export interface ICardsListResponse {
  currencies: string[];
  cards: ICardResponse[];
}