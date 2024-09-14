import { z } from "zod";

const profileSechema = z.object({
  email: z.string().email(),
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  dateOfBirth: z.string().datetime(),
}).partial();
const settingsSechema = z.object({
  password: z.string().min(8).max(15),
  oldPassword: z.string().min(8).max(15),
  confirmPassword: z.string().min(8).max(15),
}).refine((data: {
  password: string;
  confirmPassword: string;
}) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
const preferencesSechema = z.object({
  currency: z.string().length(3),
  goalNotifications: z.boolean(),
  loanNotifications: z.boolean(),
  budgetNotifications: z.boolean(),
}).partial();

export {
  profileSechema,
  settingsSechema,
  preferencesSechema
};
