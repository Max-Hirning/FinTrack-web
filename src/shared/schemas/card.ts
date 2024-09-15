import { z } from "zod";

const cardSchema = z.object({
  title: z.string().min(1),
  currency: z.string().length(3),
  startBalance: z.string().min(1),
});
const loanSchema = z.object({
  title: z.string().min(1),
  amount: z.string().min(0),
  date: z.string().datetime(),
  currency: z.string().length(3),
  description: z.string().min(1),
  deadline: z.string().datetime(),
});
const goalSchema = z.object({
  title: z.string().min(1),
  amount: z.string().min(0),
  balance: z.string().min(0),
  currency: z.string().length(3),
  description: z.string().min(1),
  deadline: z.string().datetime(),
});
const budgetSchema = z.object({
  title: z.string().min(1),
  balance: z.string().min(1),
  currency: z.string().length(3),
  cards: z.array(z.string()).min(1),
  categories: z.array(z.string()).min(1),
  period: z.enum(["oneTime", "year", "month", "week"]),
});

export {
  cardSchema,
  loanSchema,
  goalSchema,
  budgetSchema,
};
