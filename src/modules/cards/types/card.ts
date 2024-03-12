import {IUserResponse} from "@/modules/profile";

export interface ICardsFilters {
  cards: string[];
}

export interface ICardResponse {
  id: string;
  color: string;
  title: string;
  balance: number;
  currency: string;
  owner: Omit<IUserResponse, "cards"|"currency">
}