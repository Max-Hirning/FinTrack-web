"use client";

import {IResponse} from "@/types/api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/types/store";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {transactionsAPI} from "../controllers/api";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {ITransactionForm, resetTransaction} from "@/modules/store";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateTransaction(): UseMutationResult<IResponse<undefined>, unknown, ITransactionForm, unknown> {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation({
    mutationFn: ({_id, ...data}: ITransactionForm): Promise<IResponse<undefined>> => transactionsAPI.update(data, _id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>, data: ITransactionForm) => {
      if(data.categoryId) queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesExpensesStatistics]});
      if(data.amount || data.cardId || data.date) {
        queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesExpensesStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getMonthlyExpensesStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpensesStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactionsStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getAccountStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      }
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      ToastifyCaller(IStatuses.success, success.message);
      dispatch(resetTransaction());
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.updateTransaction],
  });
}
