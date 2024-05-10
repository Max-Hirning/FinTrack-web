"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api/finance";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {ICategoriesExpensesStatisticsFilters, ICategoriesExpensesStatisticsResponse} from "../types/categoriesExpensesStatistics";

export function useGetCategoriesExpensesStatistics(filters: ICategoriesExpensesStatisticsFilters, token: string): UseQueryResult<IResponse<{[key: string]: ICategoriesExpensesStatisticsResponse}>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  const currency = (session?.user as IUserSession)?.currency;

  if(cards) filters.cards = cards;
  if(currency) filters.currency = currency;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCategoriesExpensesStatistics, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<{[key: string]: ICategoriesExpensesStatisticsResponse}>> => analyticsAPI.getCategoriesExpenses(filters, token),
  });
}