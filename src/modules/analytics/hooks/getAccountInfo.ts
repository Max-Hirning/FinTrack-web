"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {IAccountFilters} from "../types/account";
import {useSuspenseQuery} from "@tanstack/react-query";

export function useGetAccountInfo(filters: IAccountFilters, token: string) {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getInfo, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getAccountInfo(filters, token),
  });
}