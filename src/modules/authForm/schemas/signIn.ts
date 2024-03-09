import {object, string} from "yup";

export const signInSchema = object({
  password: string().required("Password is required").min(8).max(20),
  email: string().email("Email must be valid").required("Email is required"), 
});