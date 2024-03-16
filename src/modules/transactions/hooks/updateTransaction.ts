"use client";

import {IResponse} from "@/types/api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/types/store";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {transactionsAPI} from "../controllers/api";
import {ITransactionForm, resetCard} from "@/modules/store";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateTransaction() {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation({
    mutationFn: ({_id, ...data}: ITransactionForm): Promise<IResponse<undefined>> => transactionsAPI.update(data, _id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBalances]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getInfo]});
      console.log(success.message);
      dispatch(resetCard());
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.updateTransaction],
  });
}
