export enum QueryKeys {
  signIn = "sign-in",
  signUp = "sign-up",
  resetPassword = "reset-password",
  forgotPassword = "forgot-password",
  
  getCards = "get-cards",
  createCard = "create-card",
  updateCard = "update-card",
  deleteCard = "delete-card",

  getPortfolios = "get-portfolios",
  createPortfolio = "create-portfolio",
  updatePortfolio = "update-portfolio",
  deletePortfolio = "delete-portfolio",

  getTransactions = "get-transactions",
  createTransaction = "create-transaction",
  updateTransaction = "update-transaction",
  deleteTransaction = "delete-transaction",

  getUser = "get-user",
  updateUser = "update-user",
  deleteUser = "delete-user",
  deleteUserAvatar = "delete-user-avatar",
  updateUserSecurity = "update-user-security",

  //analytics
  getAccountStatistics = "get-account-statistics",
  getTransactionsStatistics = "get-transactions-statistics",
  getCardsExpensesStatistics = "get-cards-expenses-statistics",
  getMonthlyExpensesStatistics = "get-monthly-expenses-statistics",
  getPortfolioAssetsStatistics = "get-portfolio-assets-statistics",
  getCategoriesExpensesStatistics = "get-categories-expenses-statistics",
}