"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IYearlyStatisticsFilters, IYearlyStatisticsResponse} from "../types/yearlyStatistics";

export function useGetYearlyStatistics(filters: IYearlyStatisticsFilters, token: string): UseQueryResult<IResponse<{[key: string]: IYearlyStatisticsResponse}>, unknown> {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getYearlyStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: IYearlyStatisticsResponse}>> => analyticsAPI.getYearlyStatistics(filters, token),
  });
}