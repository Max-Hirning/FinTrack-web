"use client";

import {IResponse} from "@/types/api";
import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {ICardsFilters, ICardsListResponse} from "../types/card";
import {UseSuspenseQueryResult, useSuspenseQuery} from "@tanstack/react-query";

export function useGetCards(filters: ICardsFilters, token: string): UseSuspenseQueryResult<IResponse<ICardsListResponse>, unknown> {
  return useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<ICardsListResponse>> => cardAPI.getAll(filters, token),
  });
}