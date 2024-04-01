"use client";

import {IResponse} from "@/types/api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/types/store";
import {useSession} from "next-auth/react";
import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {ICardForm, resetCard} from "@/modules/store";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateCard(): UseMutationResult<IResponse<undefined>, unknown, ICardForm, unknown> {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation({
    mutationFn: ({_id, ...data}: ICardForm): Promise<IResponse<undefined>> => cardAPI.update(data, _id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>, data: ICardForm) => {
      if(data.currency) {
        queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesExpensesStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getMonthlyExpensesStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactionsStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getAccountStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      }
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpensesStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      ToastifyCaller(IStatuses.success, success.message);
      dispatch(resetCard());
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.updateCard],
  });
}
