"use client";

import {cardAPI} from "../controllers/api";
import {ICardsFilters} from "../types/card";
import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";

export function useGetCards(filters: Pick<ICardsFilters, "ownerId">, token: string) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(filters)],
    queryFn: () => cardAPI.getAll(filters, token),
  });
}