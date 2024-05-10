import {object, string} from "yup";

export const portfolioFormSchema = object({
  color: string().required("Color is required"),
  title: string().required("Title is required").max(100, "Max length is 100 chars"),
});