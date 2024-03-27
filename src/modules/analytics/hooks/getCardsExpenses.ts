"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseSuspenseQueryResult, useSuspenseQuery} from "@tanstack/react-query";
import {ICardsExpensesFilters, ICardsExpensesResponse} from "../types/cardsExpensesStatistics";

export function useGetCardsExpenses(filters: ICardsExpensesFilters, token: string): UseSuspenseQueryResult<IResponse<ICardsExpensesResponse[]>, unknown> {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<ICardsExpensesResponse[]>> => analyticsAPI.getCardsExpenses(filters, token),
  });
}