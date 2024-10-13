import { budgetInput, cardInput, goalInput, loanInput } from "shared/types"

const cardModel: cardInput = {
  title: "",
  color: "",
  currency: "USD",
  startBalance: "0",
}
const loanModel: loanInput = {
  title: "",
  amount: "0",
  currency: "USD",
  description: "",
  date: new Date().toISOString(),
  deadline: new Date().toISOString(),
}
const goalModel: goalInput = {
  title: "",
  amount: "0",
  balance: "0",
  currency: "USD",
  description: "",
  deadline: new Date().toISOString(),
}
const budgetModel: budgetInput = {
  title: "",
  cardIds: [],
  balance: "0",
  categoryIds: [],
  currency: "USD", 
  period: "oneTime",
  endDate: undefined,
  startDate: undefined,
}

export {
  cardModel,
  loanModel,
  goalModel,
  budgetModel,
}