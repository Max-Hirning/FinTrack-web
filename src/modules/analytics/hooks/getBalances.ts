"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {analyticsAPI} from "../controllers/api";
import {IBalanceStatisticsFilters} from "../types/balanceStatistics";

export function useGetBalances(filters: IBalanceStatisticsFilters, token: string) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getBalances, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getBalancesStatistics(filters, token),
  });
}