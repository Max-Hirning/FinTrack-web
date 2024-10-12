import { transactionInput } from "shared/types"

const transactionModel: transactionInput = {
  cardId: "",
  amount: "0",
  category: "",
  description: "",
  goalId: undefined,
  loanId: undefined,
  date: new Date().toISOString(),
}

export {
  transactionModel
}