"use client";

import {IResponse} from "@/types/api";
import {ICardForm} from "@/modules/store";
import {useSession} from "next-auth/react";
import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateCard() {
  const {data: session} = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, ...data}: ICardForm): Promise<IResponse<undefined>> => cardAPI.update(data, id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
      console.log(success.message);
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.updateCard],
  });
}
