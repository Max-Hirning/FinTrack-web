import {z} from "zod";
import {signInSchema} from "shared/schemas/sign-in";

type signInInput = z.infer<typeof signInSchema>;

export type {
  signInInput,
};