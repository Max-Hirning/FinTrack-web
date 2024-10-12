import { currencyService } from "shared/lib";
import { QueryKeys } from "shared/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrencies = () => {
  return useQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: async () => currencyService.getCurrencies(),
  });
};