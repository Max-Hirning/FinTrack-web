"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation} from "@tanstack/react-query";
import {ISecurityForm} from "../types/securityForm";

export function useUpdateSecurity() {
  const {data: session} = useSession();

  return useMutation({
    mutationFn: (data: Omit<ISecurityForm, "confirmPassword">): Promise<IResponse<undefined>> => userAPI.updateSecurity(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      console.log(success.message);
    },
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    mutationKey: [QueryKeys.updateUserSecurity],
  });
}
