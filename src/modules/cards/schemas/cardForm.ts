import {number, object, string} from "yup";

export const cardFormSchema = object({
  color: string().required("Color is required"),
  balance: number().required("Balance is required"),
  currency: string().required("Currency is required"),
  title: string().required("Title is required").max(100, "Max length is 100 chars"),
});