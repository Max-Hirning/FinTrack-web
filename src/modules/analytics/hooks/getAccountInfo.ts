"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IAccountFilters, IAccountResponse} from "../types/account";

export function useGetAccountInfo(filters: IAccountFilters, token: string): UseQueryResult<IResponse<IAccountResponse>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  if(cards) filters.cards.cards = (session?.user as IUserSession)?.cards;
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getInfo, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IAccountResponse>> => analyticsAPI.getAccountInfo(filters, token),
  });
}