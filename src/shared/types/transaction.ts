import {z} from "zod";
import { currencies } from "shared/types";
import { transactionSchema } from "shared/schemas";

type transactionInput = z.infer<typeof transactionSchema>;

interface IFilterTransactions {
  page?: number;
  userIds: string[];
  loanIds: string[];
  goalIds: string[];
  cardIds: string[];
  budgetIds: string[];
  transactionIds: string[];
  currencies: currencies[];
}

export type {
  transactionInput,
  IFilterTransactions
};