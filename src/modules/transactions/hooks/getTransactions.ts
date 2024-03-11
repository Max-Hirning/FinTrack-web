"use client";

import {IFilters} from "../types/transaction";
import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {transactionsAPI} from "../controllers/api";

export function useGetTransactions(filters: IFilters, token: string) {
  return useQuery({
    queryFn: () => transactionsAPI.getAll(filters, token),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getTransactions, JSON.stringify(filters)],
  });
}