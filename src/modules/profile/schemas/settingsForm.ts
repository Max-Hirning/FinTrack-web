import {object, string} from "yup";

export const settingsFormSchema = object({
  date: string().notRequired(),
  lastName: string().notRequired().max(100, "Max length is 100 chars"),
  firstName: string().notRequired().max(100, "Max length is 100 chars"),
  email: string().email("Must be valid email").notRequired().max(100, "Max length is 100 chars"),
});