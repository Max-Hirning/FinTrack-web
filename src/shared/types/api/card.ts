import { currencies, IUserResponse } from "shared/types";

interface ICardResponse {
  id: string;
  title: string;
  color: string;
  balance: number;
  currency: currencies;
  user: Pick<IUserResponse, "lastName"|"firstName"|"images"|"id">;
}

export type {
  ICardResponse
}