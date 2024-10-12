import {z} from "zod";
import { transactionSchema } from "shared/schemas";

type transactionInput = z.infer<typeof transactionSchema>;

export type {
  transactionInput
};