import { z } from "zod"
import { signInSchema } from "./sign-in"
import { signUpSchema } from "./sign-up";

const resetPasswordSchema = signInSchema.pick({
  password: true
}).extend({
  confirmPassword: z.string().min(8).max(15),
}).refine((data: {
  password: string;
  confirmPassword: string;
}) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export {
  resetPasswordSchema
}