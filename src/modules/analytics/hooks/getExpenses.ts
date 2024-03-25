"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {useSuspenseQuery} from "@tanstack/react-query";
import {IExpensesFilters} from "../types/expensesStatistics";

export function useGetExpenses(filters: IExpensesFilters, token: string) {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getExpenses, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getExpenses(filters, token),
  });
}