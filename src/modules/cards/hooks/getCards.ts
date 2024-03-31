"use client";

import {IResponse} from "@/types/api";
import {cardAPI} from "../controllers/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {ICardsFilters, ICardsListResponse} from "../types/card";

export function useGetCards(filters: ICardsFilters, token: string): UseQueryResult<IResponse<ICardsListResponse>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;

  if(cards) filters.cards = cards;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<ICardsListResponse>> => cardAPI.getAll(filters, token),
  });
}