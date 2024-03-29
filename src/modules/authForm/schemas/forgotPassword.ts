import {object, string} from "yup";

export const forgotPasswordSchema = object({
  email: string().email("Email must be valid").required("Email is required"), 
});