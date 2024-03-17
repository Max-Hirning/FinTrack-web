"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation} from "@tanstack/react-query";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";

export function useDeleteUserAvatar() {
  const {data: session, update} = useSession();

  return useMutation({
    mutationFn: (): Promise<IResponse<undefined>> => userAPI.deleteAvatar((session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.deleteUserAvatar],
  });
}
