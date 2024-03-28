"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IAccountFilters, IAccountResponse} from "../types/account";

export function useGetAccountInfo(filters: IAccountFilters, token: string): UseQueryResult<IResponse<IAccountResponse>, unknown> {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getInfo, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IAccountResponse>> => analyticsAPI.getAccountInfo(filters, token),
  });
}