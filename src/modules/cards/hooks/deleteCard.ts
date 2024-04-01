"use client";

import {IResponse} from "@/types/api";
import {resetCard} from "@/modules/store";
import {useSession} from "next-auth/react";
import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useDeleteCard(): UseMutationResult<IResponse<undefined>, unknown, void, unknown> {
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const {data: session, update} = useSession();
  const cardFormInitialValues = useSelector((state: RootState) => state.cardForm);

  return useMutation({
    mutationFn: (): Promise<IResponse<undefined>> => cardAPI.delete(cardFormInitialValues._id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesExpensesStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getMonthlyExpensesStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpensesStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactionsStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getAccountStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      ToastifyCaller(IStatuses.success, success.message);
      dispatch(resetCard());
      update();
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.deleteCard],
  });
}
