"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseSuspenseQueryResult, useSuspenseQuery} from "@tanstack/react-query";
import {IWeeklyStatisticsFilters, IWeeklyStatisticsResponse} from "../types/weeklyStatistics";

export function useGetWeeklyStatistics(filters: IWeeklyStatisticsFilters, token: string): UseSuspenseQueryResult<IResponse<{[key: string]: IWeeklyStatisticsResponse}>, unknown> {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getWeeklyStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IWeeklyStatisticsResponse}>> => analyticsAPI.getWeeklyStatistics(filters, token),
  });
}