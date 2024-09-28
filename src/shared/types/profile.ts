import {z} from "zod";
import { preferencesSchema, profileSchema, settingsSchema } from "shared/schemas";

type profileInput = z.infer<typeof profileSchema>;
type settingsInput = z.infer<typeof settingsSchema>;
type preferencesInput = z.infer<typeof preferencesSchema>;

export type {
  profileInput,
  settingsInput,
  preferencesInput,
};