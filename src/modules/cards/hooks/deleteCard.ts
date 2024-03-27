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
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getExpenses]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBalances]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getInfo]});
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
