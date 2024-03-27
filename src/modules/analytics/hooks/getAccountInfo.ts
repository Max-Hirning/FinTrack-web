"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {IAccountFilters, IAccountResponse} from "../types/account";
import {UseSuspenseQueryResult, useSuspenseQuery} from "@tanstack/react-query";

export function useGetAccountInfo(filters: IAccountFilters, token: string): UseSuspenseQueryResult<IResponse<IAccountResponse>, unknown> {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getInfo, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IAccountResponse>> => analyticsAPI.getAccountInfo(filters, token),
  });
}