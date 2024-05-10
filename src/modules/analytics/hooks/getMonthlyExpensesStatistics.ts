"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api/finance";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IMonthlyExpensesStatisticsFilters, IMonthlyExpensesStatisticsResponse} from "../types/monthlyExpensesStatistics";

export function useGetMonthlyExpensesStatistics(filters: IMonthlyExpensesStatisticsFilters, token: string): UseQueryResult<IResponse<IMonthlyExpensesStatisticsResponse>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  const currency = (session?.user as IUserSession)?.currency;

  if(cards) filters.cards = cards;
  if(currency) filters.currency = currency;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getMonthlyExpensesStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IMonthlyExpensesStatisticsResponse>> => analyticsAPI.getMonthlyExpensesStatistics(filters, token),
  });
}