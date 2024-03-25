"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {transactionsAPI} from "../controllers/api";
import {useSuspenseQuery} from "@tanstack/react-query";
import {ITransactionsFilters} from "../types/transaction";

export function useGetTransactions(filters: Partial<ITransactionsFilters>, token: string) {
  return useSuspenseQuery({
    queryFn: () => transactionsAPI.getAll(filters, token),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getTransactions, JSON.stringify(filters)],
  });
}