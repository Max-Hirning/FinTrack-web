"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {transactionsAPI} from "../controllers/api";
import {ITransactionsFilters} from "../types/transaction";

export function useGetTransactions(filters: Partial<ITransactionsFilters>, token: string) {
  return useQuery({
    queryFn: () => transactionsAPI.getAll(filters, token),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getTransactions, JSON.stringify(filters)],
  });
}