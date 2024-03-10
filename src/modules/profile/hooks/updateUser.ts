"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation} from "@tanstack/react-query";

export function useUpdateUser() {
  const {data: session, update} = useSession();

  return useMutation({
    mutationFn: (data: FormData): Promise<IResponse<undefined>> => userAPI.update(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      console.log(success.message);
      update();
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.updateUser],
  });
}
