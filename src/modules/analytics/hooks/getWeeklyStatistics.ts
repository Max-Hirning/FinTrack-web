"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {useSuspenseQuery} from "@tanstack/react-query";
import {IWeeklyStatisticsFilters} from "../types/weeklyStatistics";

export function useGetWeeklyStatistics(filters: IWeeklyStatisticsFilters, token: string) {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getWeeklyStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getWeeklyStatistics(filters, token),
  });
}