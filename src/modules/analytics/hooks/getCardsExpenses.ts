"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {ICardsExpensesFilters, ICardsExpensesResponse} from "../types/cardsExpensesStatistics";

export function useGetCardsExpenses(filters: ICardsExpensesFilters, token: string): UseQueryResult<IResponse<ICardsExpensesResponse[]>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  const currency = (session?.user as IUserSession)?.currency;

  if(cards) filters.filters.cards = cards;
  if(currency) filters.currency = currency;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<ICardsExpensesResponse[]>> => analyticsAPI.getCardsExpenses(filters, token),
  });
}