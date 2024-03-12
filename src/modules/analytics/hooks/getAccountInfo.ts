"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {analyticsAPI} from "../controllers/api";
import {IAccountFilters} from "../types/account";

export function useGetAccountInfo(filters: IAccountFilters, token: string) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getInfo, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getAccountInfo(filters, token),
  });
}