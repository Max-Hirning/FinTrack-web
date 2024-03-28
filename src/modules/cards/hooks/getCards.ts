"use client";

import {IResponse} from "@/types/api";
import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {ICardsFilters, ICardsListResponse} from "../types/card";

export function useGetCards(filters: ICardsFilters, token: string): UseQueryResult<IResponse<ICardsListResponse>, unknown> {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<ICardsListResponse>> => cardAPI.getAll(filters, token),
  });
}