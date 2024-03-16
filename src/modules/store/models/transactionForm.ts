import {ITransactionForm} from "../types/transactionForm";

export const transactionFormInitialValues: ITransactionForm = {
  _id: "",
  amount: 0,
  cardId: "",
  categoryId: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
};