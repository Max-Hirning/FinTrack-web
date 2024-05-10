"use client";

import {IResponse} from "@/types/api";
import {ICardForm} from "@/modules/store";
import {useSession} from "next-auth/react";
import {cardAPI} from "../controllers/api/card";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateCard(): UseMutationResult<IResponse<undefined>, unknown, Omit<ICardForm, "_id">, unknown> {
  const queryClient = useQueryClient();
  const {data: session, update} = useSession();
  
  return useMutation({
    mutationFn: (data: Omit<ICardForm, "_id">): Promise<IResponse<undefined>> => cardAPI.create(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getAccountStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.createCard],
  });
}
