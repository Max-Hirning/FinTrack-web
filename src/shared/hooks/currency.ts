"use client";

import { currencyService } from "shared/lib";
import { QueryKeys } from "shared/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetCurrencies = () => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: async () => currencyService.getCurrencies(),
  });
};