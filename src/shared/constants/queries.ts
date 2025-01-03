import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

export enum QueryKeys {
  getNotifications = "get-notifications",

  getAccount = "get-account",
  getStatistic = "get-statistic",
  getCardsStatistic = "get-cards-statistic",
  getCategoriesStatistic = "get-categories-statistic",

  getUser = "get-user",
  deleteUser = "delete-user",

  getBudget = "get-budget",
  getBudgets = "get-budgets",
  deleteBudget = "delete-budget",

  getCard = "get-card",
  getCards = "get-cards",
  deleteCard = "delete-card",

  getTransaction = "get-transaction",
  getTransactions = "get-transactions",
  deleteTransaction = "delete-transaction",

  getGoal = "get-goal",
  getGoals = "get-goals",
  deleteGoal = "delete-goal",

  getLoan = "get-loan",
  getLoans = "get-loans",
  deleteLoan = "delete-loan",

  getCategories = "get-categories",

  getCurrencies = "get-currencies",
}

export const queryClient = new QueryClient({
  // queryCache: new QueryCache({
  //   onError: async (error: DefaultError, query): Promise<void> => {
  //     const errorResponse = error.cause as IResponse;
  //     console.log('error', error);
  //     if (errorResponse?.status === 401) {
  //       const response = await refreshTokens();
  //       if (response?.status === 202) {
  //         redirect('/auth/sign-in');
  //       }
  //       queryClient.refetchQueries({
  //         queryKey: query.queryKey,
  //         exact: true,
  //       });
  //     }
  //   },
  // }),
  // mutationCache: new MutationCache({
  //   onError: async (error, variables, _context, mutation): Promise<void> => {
  //     const errorResponse = error.cause as IResponse;
  //     if (errorResponse?.status === 401) {
  //       const response = await refreshTokens();
  //       if (response?.status === 202) {
  //         redirect('/auth/sign-in');
  //       }
  //       mutation.execute(variables);
  //     }
  //   },
  // }),
  defaultOptions: {
    // queries: {
    //   staleTime: 60 * 1000,
    // },
    dehydrate: {
      // include pending queries in dehydration
      shouldDehydrateQuery: query =>
        defaultShouldDehydrateQuery(query) || query.state?.status === 'pending',
    },
  },
});
