import { z } from "zod"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(15),
})
const checkCodeSchema = z.object({
  code: z.string().length(6),
})
const sendCodeSchema = signInSchema.pick({
  email: true
})
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
  signInSchema,
  signUpSchema,
  sendCodeSchema,
  checkCodeSchema,
  resetPasswordSchema
}