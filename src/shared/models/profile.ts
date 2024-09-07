import { preferencesInput, profileInput, settingsInput } from "shared/types/profile"

const profileModel: profileInput = {
  email: undefined,
  lastName: undefined,
  firstName: undefined,
  dateOfBirth: undefined,
}
const settingsModel: settingsInput = {
  password: "",
  oldPassword: "",
  confirmPassword: "",
}
const preferencesModel: preferencesInput = {
  currency: undefined,
  budgetNotifications: undefined,
}

export {
  profileModel,
  settingsModel,
  preferencesModel
}