import { budgetInput, cardInput, goalInput, loanInput } from "shared/types/card"

const cardModel: cardInput = {
  title: "",
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
  cards: [],
  balance: "0",
  categories: [],
  currency: "USD", 
  period: "oneTime",
}

export {
  cardModel,
  loanModel,
  goalModel,
  budgetModel,
}