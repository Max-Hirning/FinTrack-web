"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {ICardsExpensesFilters, ICardsExpensesResponse} from "../types/cardsExpensesStatistics";

export function useGetCardsExpenses(filters: ICardsExpensesFilters, token: string): UseQueryResult<IResponse<ICardsExpensesResponse[]>, unknown> {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<ICardsExpensesResponse[]>> => analyticsAPI.getCardsExpenses(filters, token),
  });
}