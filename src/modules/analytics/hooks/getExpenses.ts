"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {analyticsAPI} from "../controllers/api";
import {IExpensesFilters} from "../types/expensesStatistics";

export function useGetExpenses(filters: IExpensesFilters, token: string) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getExpenses, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getExpenses(filters, token),
  });
}