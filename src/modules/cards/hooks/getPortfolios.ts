"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {portfolioAPI} from "../controllers/api/portfolio";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IPortfoliosFilters, IPortfoliosListResponse} from "../types/portfolio";

export function useGetPortfolios(filters: Pick<IPortfoliosFilters, "ownerId">, token: string): UseQueryResult<IResponse<IPortfoliosListResponse>, unknown> {
  const {data: session} = useSession();
  const ownerId = (session?.user as IUserSession)?.id;

  if(ownerId) filters.ownerId = ownerId;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getPortfolios, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IPortfoliosListResponse>> => portfolioAPI.getAll(filters, token),
  });
}