"use client";

import {IResponse} from "@/types/api";
import {useRouter} from "next/navigation";
import {authAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IResetPassword} from "../types/resetPassword";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

export function useResetPassword(code: string): UseMutationResult<IResponse<undefined>, unknown, IResetPassword, unknown> {
  const {push} = useRouter();

  return useMutation({
    mutationKey: [QueryKeys.resetPassword],
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      push("/auth/sign-in");
    },
    mutationFn: async (data: IResetPassword): Promise<IResponse<undefined>> => authAPI.resetPassword(data, code),
  });
}