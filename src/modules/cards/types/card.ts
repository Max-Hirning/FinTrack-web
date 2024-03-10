import {IUserResponse} from "@/modules/profile";

export interface ICardsResponse {
  id: string;
  color: string;
  title: string;
  balance: number;
  currency: string;
  owner: Omit<IUserResponse, "cards"|"currency">
}