import { IImage, currencies, statuses } from "shared/types";

type roles =  "admin" | "user" | "guest";

interface IEl {
  id: string;
  title: string;
  status?: statuses;
}
interface IUserResponse {
  id: string;
  role: roles;
  cards: IEl[];
  loans: IEl[];
  goals: IEl[];
  email: string;
  budgets: IEl[];
  images: IImage[];
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  currency: currencies;
  goalNotification: boolean;
  loanNotification: boolean;
  budgetNotification: boolean;
}

export type {
  IUserResponse
}