"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IYearlyStatisticsFilters, IYearlyStatisticsResponse} from "../types/yearlyStatistics";

export function useGetYearlyStatistics(filters: IYearlyStatisticsFilters, token: string): UseQueryResult<IResponse<{[key: string]: IYearlyStatisticsResponse}>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  const currency = (session?.user as IUserSession)?.currency;

  if(cards) filters.filters.cards = cards;
  if(currency) filters.currency = currency;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getYearlyStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IYearlyStatisticsResponse}>> => analyticsAPI.getYearlyStatistics(filters, token),
  });
}