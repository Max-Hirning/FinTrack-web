import {z} from "zod";
import {signUpSchema} from "shared/schemas/sign-up";

type signUpInput = z.infer<typeof signUpSchema>;

export type {
  signUpInput,
};