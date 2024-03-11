"use client";

import {IResponse} from "@/types/api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/types/store";
import {useSession} from "next-auth/react";
import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {ICardForm, resetCard} from "@/modules/store";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateCard() {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation({
    mutationFn: ({id, ...data}: ICardForm): Promise<IResponse<undefined>> => cardAPI.update(data, id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      dispatch(resetCard());
      console.log(success.message);
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.updateCard],
  });
}
