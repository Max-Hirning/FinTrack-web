import { ICardResponse, ICategoryResponse, IGoalResponse, ILoanResponse } from "shared/types";

interface ITransactionResponse {
  id: string;
  date: string;
  amount: number;
  balance: number;
  description: string;
  goalBalance: number;
  loanBalance: number;
  category: ICategoryResponse;
  card: Omit<ICardResponse, "user">;
  goal: Omit<IGoalResponse, "user"> | null;
  loan: Omit<ILoanResponse, "user"> | null;
}

export type {
  ITransactionResponse
}