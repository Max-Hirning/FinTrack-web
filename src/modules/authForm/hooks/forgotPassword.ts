"use client";

import {IResponse} from "@/types/api";
import {authAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {IForgotPassword} from "../types/forgotPassword";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

export function useForgotPassword(): UseMutationResult<IResponse<undefined>, unknown, IForgotPassword, unknown> {
  return useMutation({
    mutationKey: [QueryKeys.forgotPassword],
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
    },
    mutationFn: async (data: IForgotPassword): Promise<IResponse<undefined>> => authAPI.forgotPassword(data),
  });
}