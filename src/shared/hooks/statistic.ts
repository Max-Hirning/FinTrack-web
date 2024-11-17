"use client";

import { QueryKeys } from "shared/constants";
import { statisticService } from "shared/lib";
import { IFilterStatistic } from "shared/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

export const useGetAccount = (userId: string) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getAccount, userId],
    queryFn: () => statisticService.getAccount(userId),
  });
}
export const useGetStatistic = (query: IFilterStatistic) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getStatistic, query],
    queryFn: () => statisticService.getStatistic(query),
  });
}
export const useGetCardsStatistic = (query: IFilterStatistic) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getCardsStatistic, query],
    queryFn: () => statisticService.getCards(query),
  });
}
export const useGetCategoriesStatistic = (query: IFilterStatistic) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getCategoriesStatistic, query],
    queryFn: () => statisticService.getCategories(query),
  });
}
