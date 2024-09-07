import {z} from "zod";
import { preferencesSechema, profileSechema, settingsSechema } from "shared/schemas/profile";

type profileInput = z.infer<typeof profileSechema>;
type settingsInput = z.infer<typeof settingsSechema>;
type preferencesInput = z.infer<typeof preferencesSechema>;

export type {
  profileInput,
  settingsInput,
  preferencesInput,
};