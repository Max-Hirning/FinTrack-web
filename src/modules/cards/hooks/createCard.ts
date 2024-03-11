"use client";

import {IResponse} from "@/types/api";
import {ICardForm} from "@/modules/store";
import {useSession} from "next-auth/react";
import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateCard() {
  const queryClient = useQueryClient();
  const {data: session, update} = useSession();
  
  return useMutation({
    mutationFn: (data: Omit<ICardForm, "id">): Promise<IResponse<undefined>> => cardAPI.create(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBalances]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getInfo]});
      console.log(success.message);
      update();
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.createCard],
  });
}
