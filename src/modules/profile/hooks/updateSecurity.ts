"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {useMutation} from "@tanstack/react-query";
import {ISecurityForm} from "../types/securityForm";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";

export function useUpdateSecurity() {
  const {data: session} = useSession();

  return useMutation({
    mutationFn: (data: Omit<ISecurityForm, "confirmPassword">): Promise<IResponse<undefined>> => userAPI.updateSecurity(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.updateUserSecurity],
  });
}
