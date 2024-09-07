import { signUpInput, checkCodeInput, resetPasswordInput, sendCodeInput, signInInput } from "shared/types"

const signUpModel: signUpInput = {
  email: "",
  password: "",
  lastName: "",
  firstName: "",
  confirmPassword: "",
}
const signInModel: signInInput = {
  email: "",
  password: "",
}
const sendCodeModel: sendCodeInput = {
  email: "",
}
const checkCodeModel: checkCodeInput = {
  code: "",
}
const resetPasswordModel: resetPasswordInput = {
  password: "",
  confirmPassword: "",
}

export {
  signUpModel,
  signInModel,
  sendCodeModel,
  checkCodeModel,
  resetPasswordModel
}