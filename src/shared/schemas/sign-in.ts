import { z } from "zod"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(15),
})

export {
  signInSchema
}