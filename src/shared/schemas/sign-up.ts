import { z } from "zod"
import { signInSchema } from "./sign-in"

const signUpSchema = signInSchema.extend({
  lastName: z.string(),
  firstName: z.string(),
  confirmPassword: z.string().min(8).max(15),
}).refine((data: {
  password: string;
  confirmPassword: string;
}) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export {
  signUpSchema
}