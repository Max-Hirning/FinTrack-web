import { z } from "zod";

const cardSchema = z.object({
  title: z.string().min(1),
  color: z.string().min(1),
  currency: z.string().length(3),
  startBalance: z.string().min(1),
});
const loanSchema = z.object({
  title: z.string().min(1),
  amount: z.string().min(1),
  date: z.string().datetime(),
  currency: z.string().length(3),
  deadline: z.string().datetime(),
  description: z.string().optional(),
});
const goalSchema = z.object({
  title: z.string().min(1),
  amount: z.string().min(1),
  balance: z.string().min(1),
  currency: z.string().length(3),
  deadline: z.string().datetime(),
  description: z.string().optional(),
});
const budgetSchema = z.object({
  title: z.string().min(1),
  balance: z.string().min(1),
  currency: z.string().length(3),
  cards: z.array(z.string()).min(1),
  categories: z.array(z.string()).min(1),
  endDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  period: z.enum(["oneTime", "year", "month", "week"]),
});

export {
  cardSchema,
  loanSchema,
  goalSchema,
  budgetSchema,
};
