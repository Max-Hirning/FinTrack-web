"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {useSuspenseQuery} from "@tanstack/react-query";
import {IYearlyStatisticsFilters} from "../types/yearlyStatistics";

export function useGetYearlyStatistics(filters: IYearlyStatisticsFilters, token: string) {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getYearlyStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getYearlyStatistics(filters, token),
  });
}