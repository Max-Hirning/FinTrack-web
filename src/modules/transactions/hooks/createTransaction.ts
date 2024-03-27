"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {ITransactionForm} from "@/modules/store";
import {transactionsAPI} from "../controllers/api";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateTransaction(): UseMutationResult<IResponse<undefined>, unknown, Omit<ITransactionForm, "_id">, unknown> {
  const queryClient = useQueryClient();
  const {data: session} = useSession();
  
  return useMutation({
    mutationFn: (data: Omit<ITransactionForm, "_id">): Promise<IResponse<undefined>> => transactionsAPI.create(data, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBalances]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getInfo]});
      ToastifyCaller(IStatuses.success, success.message);
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.createTransaction],
  });
}
