"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IWeeklyStatisticsFilters, IWeeklyStatisticsResponse} from "../types/weeklyStatistics";

export function useGetWeeklyStatistics(filters: IWeeklyStatisticsFilters, token: string): UseQueryResult<IResponse<{[key: string]: IWeeklyStatisticsResponse}>, unknown> {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getWeeklyStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IWeeklyStatisticsResponse}>> => analyticsAPI.getWeeklyStatistics(filters, token),
  });
}