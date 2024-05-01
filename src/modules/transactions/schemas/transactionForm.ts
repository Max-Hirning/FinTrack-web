import {number, object, string} from "yup";

export const transactionFormSchema = object({
  date: string().required("Date is required"),
  cardId: string().required("Card is required"),
  categoryId: string().required("Category is required"),
  description: string().notRequired().max(200, "Max length is 200 chars"),
  amount: number().required("Amount is required").notOneOf([0], "Amount must not be zero").typeError("Amount must be a number"),
});