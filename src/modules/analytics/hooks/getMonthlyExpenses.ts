"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {IExpensesResponse} from "../types/expensesStatistics";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IMonthlyExpensesStatisticsFilters, IMonthlyExpensesStatisticsResponse} from "../types/monthlyExpensesStatistics";

export function useGetMonthlyExpenses(filters: IMonthlyExpensesStatisticsFilters, token: string): UseQueryResult<IResponse<IExpensesResponse[]>, unknown> {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getMonthlyExpenses, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IMonthlyExpensesStatisticsResponse}>> => analyticsAPI.getExpenses(filters, token),
  });
}