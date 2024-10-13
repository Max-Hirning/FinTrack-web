import {z} from "zod";
import { currencies } from "shared/types";
import { budgetSchema, cardSchema, goalSchema, loanSchema } from "shared/schemas";

type cardInput = z.infer<typeof cardSchema>;
type loanInput = z.infer<typeof loanSchema>;
type goalInput = z.infer<typeof goalSchema>;
type budgetInput = z.infer<typeof budgetSchema>;

interface IFilterCards {
  page?: number;
  userIds: string[];
  cardIds: string[];
  currencies: currencies[];
}
interface IFilterGoals {
  page?: number;
  userIds: string[];
  goalIds: string[];
  currencies: currencies[];
}
interface IFilterLoans {
  page?: number;
  userIds: string[];
  loanIds: string[];
  currencies: currencies[];
}
interface IFilterBudgets {
  page?: number;
  userIds: string[];
  budgetIds: string[];
  currencies: currencies[];
}

export type {
  cardInput,
  loanInput,
  goalInput,
  budgetInput,
  IFilterLoans,
  IFilterCards,
  IFilterGoals,
  IFilterBudgets,
};