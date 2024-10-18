import { z } from "zod";

const transactionSchema = z.object({
  cardId: z.string(),
  categoryId: z.string(),
  amount: z.string().min(1),
  date: z.string().datetime(),
  goalId: z.string().optional(),
  loanId: z.string().optional(),
  description: z.string().optional(),
});

export {
  transactionSchema,
};
