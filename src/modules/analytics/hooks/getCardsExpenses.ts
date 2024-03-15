"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {analyticsAPI} from "../controllers/api";
import {ICardsExpensesFilters} from "../types/cardsExpenses";

export function useGetCardsExpenses(filters: ICardsExpensesFilters, token: string) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getCardsExpenses(filters, token),
  });
}