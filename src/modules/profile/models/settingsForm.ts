import {ISettingsForm} from "../types/settingsForm";

export const settingsFormInitialValues: Omit<ISettingsForm, "image"> = {
  email: "",
  lastName: "",
  currency: "",
  firstName: "",
};