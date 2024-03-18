"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {analyticsAPI} from "../controllers/api";
import {IWeeklyStatisticsFilters} from "../types/weeklyStatistics";

export function useGetWeeklyStatistics(filters: IWeeklyStatisticsFilters, token: string) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getWeeklyStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getWeeklyStatistics(filters, token),
  });
}