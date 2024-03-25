"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {useSuspenseQuery} from "@tanstack/react-query";
import {ICardsExpensesFilters} from "../types/cardsExpensesStatistics";

export function useGetCardsExpenses(filters: ICardsExpensesFilters, token: string) {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getCardsExpenses(filters, token),
  });
}