"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseSuspenseQueryResult, useSuspenseQuery} from "@tanstack/react-query";
import {IYearlyStatisticsFilters, IYearlyStatisticsResponse} from "../types/yearlyStatistics";

export function useGetYearlyStatistics(filters: IYearlyStatisticsFilters, token: string): UseSuspenseQueryResult<IResponse<{[key: string]: IYearlyStatisticsResponse}>, unknown> {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getYearlyStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IYearlyStatisticsResponse}>> => analyticsAPI.getYearlyStatistics(filters, token),
  });
}