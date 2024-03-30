"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api";
import {IExpensesResponse} from "../types/expensesStatistics";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IMonthlyExpensesStatisticsFilters, IMonthlyExpensesStatisticsResponse} from "../types/monthlyExpensesStatistics";

export function useGetMonthlyExpenses(filters: IMonthlyExpensesStatisticsFilters, token: string): UseQueryResult<IResponse<IExpensesResponse[]>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  if(cards) filters.filters.cards = (session?.user as IUserSession)?.cards;
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getMonthlyExpenses, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IMonthlyExpensesStatisticsResponse}>> => analyticsAPI.getExpenses(filters, token),
  });
}