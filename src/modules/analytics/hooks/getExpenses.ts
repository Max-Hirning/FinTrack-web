"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {analyticsAPI} from "../controllers/api";
import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {IExpensesFilters, IExpensesResponse} from "../types/expensesStatistics";

export function useGetExpenses(filters: IExpensesFilters, token: string): UseQueryResult<IResponse<IExpensesResponse[]>, unknown> {
  const {data: session} = useSession();
  const cards = (session?.user as IUserSession)?.cards;
  const currency = (session?.user as IUserSession)?.currency;

  if(cards) filters.filters.cards = cards;
  if(currency) filters.currency = currency;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getExpenses, JSON.stringify(filters)],
    queryFn: (): Promise<IResponse<IExpensesResponse[]>> => analyticsAPI.getExpensesCategories(filters, token),
  });
}