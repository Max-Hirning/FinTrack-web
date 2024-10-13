import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

export enum QueryKeys {
  getUser = "get-user",

  getBudget = "get-budget",
  getBudgets = "get-budgets",
  deleteBudget = "delete-budget",

  getCard = "get-card",
  getCards = "get-cards",
  deleteCard = "delete-card",

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
    queries: {
      staleTime: 60 * 1000,
    },
    dehydrate: {
      // include pending queries in dehydration
      shouldDehydrateQuery: query =>
        defaultShouldDehydrateQuery(query) || query.state?.status === 'pending',
    },
  },
});
