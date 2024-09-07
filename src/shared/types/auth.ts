import {z} from "zod";
import {signUpSchema, resetPasswordSchema, checkCodeSchema, signInSchema, sendCodeSchema} from "shared/schemas";

type signInInput = z.infer<typeof signInSchema>;
type signUpInput = z.infer<typeof signUpSchema>;
type sendCodeInput = z.infer<typeof sendCodeSchema>;
type checkCodeInput = z.infer<typeof checkCodeSchema>;
type resetPasswordInput = z.infer<typeof resetPasswordSchema>;

export type {
  signInInput,
  signUpInput,
  sendCodeInput,
  checkCodeInput,
  resetPasswordInput,
};