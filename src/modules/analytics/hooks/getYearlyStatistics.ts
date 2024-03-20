"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {analyticsAPI} from "../controllers/api";
import {IYearlyStatisticsFilters} from "../types/yearlyStatistics";

export function useGetYearlyStatistics(filters: IYearlyStatisticsFilters, token: string) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getYearlyStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getYearlyStatistics(filters, token),
  });
}