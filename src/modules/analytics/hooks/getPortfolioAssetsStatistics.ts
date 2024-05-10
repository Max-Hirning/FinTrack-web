"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api/crypto";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IPortfolioAssetsStatisticsFilters, IPortfolioAssetsStatisticsResponse} from "../types/assetsStatistics";

export function useGetPortfolioAssetsStatistics(filters: Partial<IPortfolioAssetsStatisticsFilters>, token: string): UseQueryResult<IResponse<IPortfolioAssetsStatisticsResponse>, unknown> {
  const {data: session} = useSession();
  const ownerId = (session?.user as IUserSession)?.id;

  if(ownerId) filters.ownerId = ownerId;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getPortfolioAssetsStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IPortfolioAssetsStatisticsResponse>> => analyticsAPI.getAssets(filters, token),
  });
}