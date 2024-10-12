import { QueryClient } from "@tanstack/react-query";

export enum QueryKeys {
  getUser = "get-user",

  getCategories = "get-categories",

  getCurrencies = "get-currencies",
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}