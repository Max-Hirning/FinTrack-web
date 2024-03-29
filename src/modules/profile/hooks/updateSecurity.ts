"use client";

import {IResponse} from "@/types/api";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {signOut, useSession} from "next-auth/react";
import {ISecurityForm} from "../types/securityForm";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

export function useUpdateSecurity(): UseMutationResult<IResponse<undefined>, unknown, Omit<ISecurityForm, "confirmPassword">, unknown> {
  const {data: session} = useSession();

  return useMutation({
    mutationFn: (data: Omit<ISecurityForm, "confirmPassword">): Promise<IResponse<undefined>> => userAPI.updateSecurity(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      signOut();
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.updateUserSecurity],
  });
}
