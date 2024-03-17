"use client";

import {IResponse} from "@/types/api";
import {resetCard} from "@/modules/store";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {transactionsAPI} from "../controllers/api";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useDeleteTransaction() {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const transactionFormInitialValues = useSelector((state: RootState) => state.transactionForm);

  return useMutation({
    mutationFn: (): Promise<IResponse<undefined>> => transactionsAPI.delete(transactionFormInitialValues._id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBalances]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getInfo]});
      ToastifyCaller(IStatuses.success, success.message);
      dispatch(resetCard());
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.deleteTransaction],
  });
}
