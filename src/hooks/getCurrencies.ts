"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useSuspenseQuery} from "@tanstack/react-query";
import {currencyAPI} from "@/controllers/api/currency";

export function useGetCurrencies() {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyAPI.getAll(),
  });
}