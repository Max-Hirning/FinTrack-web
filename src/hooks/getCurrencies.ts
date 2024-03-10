"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {currencyAPI} from "@/controllers/api/currency";

export function useGetCurrencies() {
  return useQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyAPI.getAll(),
  });
}