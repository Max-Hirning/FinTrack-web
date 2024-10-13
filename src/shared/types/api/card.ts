import { currencies, IUserResponse } from "shared/types";

type periods = "oneTime" | "year" | "month" | "week";

interface ICardResponse {
  id: string;
  title: string;
  color: string;
  balance: number;
  currency: currencies;
  user: Pick<IUserResponse, "lastName"|"firstName"|"id">;
}
interface IGoalResponse {
  id: string;
  title: string;
  amount: number;
  balance: number;
  deadline: string;
  description: string;
  currency: currencies;
  user: Pick<IUserResponse, "lastName"|"firstName"|"id">;
}
interface ILoanResponse {
  id: string;
  date: string;
  title: string;
  amount: number;
  balance: number;
  deadline: string;
  description: string;
  currency: currencies;
  user: Pick<IUserResponse, "lastName"|"firstName"|"id">;
}
interface IBudgetResponse {
  id: string;
  title: string;
  amount: number;
  balance: number;
  period: periods;
  endDate: string;
  cards: string[];
  startDate: string;
  categories: string[];
  currency: currencies;
  user: Pick<IUserResponse, "lastName"|"firstName"|"id">;
}


export type {
  ILoanResponse,
  IGoalResponse,
  ICardResponse,
  IBudgetResponse
}