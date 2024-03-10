"use client";

import {IResponse} from "@/types/api";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation} from "@tanstack/react-query";
import {signOut, useSession} from "next-auth/react";

export function useDeleteUser() {
  const {data: session} = useSession();

  return useMutation({
    mutationFn: (): Promise<IResponse<undefined>> => userAPI.delete((session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      console.log(success.message);
      signOut();
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.deleteUser],
  });
}
