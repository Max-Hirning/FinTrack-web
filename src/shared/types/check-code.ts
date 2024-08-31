import {z} from "zod";
import { checkCodeSchema } from "shared/schemas/check-code";

type checkCodeInput = z.infer<typeof checkCodeSchema>;

export type {
  checkCodeInput,
};