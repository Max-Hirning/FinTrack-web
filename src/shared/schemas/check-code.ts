import { z } from "zod"

const checkCodeSchema = z.object({
  code: z.string().length(6),
})

export {
  checkCodeSchema
}