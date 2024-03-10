"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation} from "@tanstack/react-query";

export function useDeleteUserAvatar() {
  const {data: session, update} = useSession();

  return useMutation({
    mutationFn: (): Promise<IResponse<undefined>> => userAPI.deleteAvatar((session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      console.log(success.message);
      update();
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.deleteUserAvatar],
  });
}
