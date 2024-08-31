import { signInSchema } from "./sign-in"

const sendCodeSchema = signInSchema.pick({
  email: true
})

export {
  sendCodeSchema
}