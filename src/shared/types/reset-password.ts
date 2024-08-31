import {z} from "zod";
import { resetPasswordSchema } from "shared/schemas/reset-password";

type resetPasswordInput = z.infer<typeof resetPasswordSchema>;

export type {
  resetPasswordInput,
};