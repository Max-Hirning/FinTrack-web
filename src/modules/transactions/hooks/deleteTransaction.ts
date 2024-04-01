"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {resetTransaction} from "@/modules/store";
import {transactionsAPI} from "../controllers/api";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useDeleteTransaction(): UseMutationResult<IResponse<undefined>, unknown, void, unknown> {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const transactionFormInitialValues = useSelector((state: RootState) => state.transactionForm);

  return useMutation({
    mutationFn: (): Promise<IResponse<undefined>> => transactionsAPI.delete(transactionFormInitialValues._id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesExpensesStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getMonthlyExpensesStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpensesStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactionsStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getAccountStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      ToastifyCaller(IStatuses.success, success.message);
      dispatch(resetTransaction());
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.deleteTransaction],
  });
}
