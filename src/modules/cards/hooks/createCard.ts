"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {cardAPI} from "../controllers/api";
import {ICardForm} from "../types/cardForm";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateCard() {
  const {data: session} = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ICardForm, "_id">): Promise<IResponse<undefined>> => cardAPI.create(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBalances]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getInfo]});
      console.log(success.message);
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.createCard],
  });
}