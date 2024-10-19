"use client";

import { toast } from "react-toastify";
import { ApiError, transactionService } from "shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useQuery } from "@tanstack/react-query"
import { transactionInput, IFilterTransactions } from "shared/types";

export const useCreateTransaction = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoan]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCard]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransaction]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]})
    },
    mutationFn: (payload: transactionInput) => transactionService.createTransaction(payload),
  });
}
export const useUpdateTransaction = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoan]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCard]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransaction]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]})
    },
    mutationFn: ({transactionId, ...payload}: transactionInput & {transactionId: string}) => transactionService.updateTransaction(payload, transactionId),
  });
}
export const useDeleteTransaction = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoan]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCard]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransaction]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]})
    },
    mutationKey: [QueryKeys.deleteTransaction],
    mutationFn: (transactionId: string) => transactionService.deleteTransaction(transactionId),
  });
}
export const useGetTransaction = (transactionId?: string) => {
  return useQuery({
    queryKey: [QueryKeys.getTransaction, transactionId],
    queryFn: () => transactionService.getTransaction(transactionId),
  });
}
export const useGetTransactions = (query: IFilterTransactions) => {
  return useQuery({
    queryKey: [QueryKeys.getTransactions, query],
    queryFn: () => transactionService.getTransactions(query),
  });
}