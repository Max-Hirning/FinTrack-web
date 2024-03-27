"use client";

import {IResponse} from "@/types/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IPagination} from "@/types/pagination";
import {transactionsAPI} from "../controllers/api";
import {UseSuspenseQueryResult, useSuspenseQuery} from "@tanstack/react-query";
import {ITransactionListResponse, ITransactionsFilters} from "../types/transaction";

export function useGetTransactions(filters: Partial<ITransactionsFilters>, token: string): UseSuspenseQueryResult<IResponse<IPagination<ITransactionListResponse>>, unknown> {
  return useSuspenseQuery({
    queryFn: (): Promise<IResponse<IPagination<ITransactionListResponse>>> => transactionsAPI.getAll(filters, token),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getTransactions, JSON.stringify(filters)],
  });
}