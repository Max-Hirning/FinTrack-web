"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {ICardsExpensesStatisticsResponse, ICardsExpensesStatisticsFilters} from "../types/cardsExpensesStatistics";

export function useGetCardsExpensesStatistics(filters: ICardsExpensesStatisticsFilters, token: string): UseQueryResult<IResponse<{[key: string]: ICardsExpensesStatisticsResponse}>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  const currency = (session?.user as IUserSession)?.currency;

  if(cards) filters.cards = cards;
  if(currency) filters.currency = currency;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpensesStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: ICardsExpensesStatisticsResponse}>> => analyticsAPI.getCardsExpenses(filters, token),
  });
}