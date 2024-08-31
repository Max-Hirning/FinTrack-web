import {z} from "zod";
import { sendCodeSchema } from "shared/schemas/send-code";

type sendCodeInput = z.infer<typeof sendCodeSchema>;

export type {
  sendCodeInput,
};