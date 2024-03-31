"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IWeeklyStatisticsFilters, IWeeklyStatisticsResponse} from "../types/weeklyStatistics";

export function useGetWeeklyStatistics(filters: IWeeklyStatisticsFilters, token: string): UseQueryResult<IResponse<{[key: string]: IWeeklyStatisticsResponse}>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  const currency = (session?.user as IUserSession)?.currency;

  if(cards) filters.filters.cards = cards;
  if(currency) filters.currency = currency;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getWeeklyStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IWeeklyStatisticsResponse}>> => analyticsAPI.getWeeklyStatistics(filters, token),
  });
}