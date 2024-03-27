"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseSuspenseQueryResult, useSuspenseQuery} from "@tanstack/react-query";
import {IExpensesFilters, IExpensesResponse} from "../types/expensesStatistics";

export function useGetExpenses(filters: IExpensesFilters, token: string): UseSuspenseQueryResult<IResponse<IExpensesResponse[]>, unknown> {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getExpenses, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IExpensesResponse[]>> => analyticsAPI.getExpenses(filters, token),
  });
}