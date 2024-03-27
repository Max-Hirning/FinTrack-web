"use client";

import {IResponse} from "@/types/api";
import {ISignUp} from "../types/signUp";
import {useRouter} from "next/navigation";
import {authAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

export function useSignUp(): UseMutationResult<IResponse<undefined>, unknown, Omit<ISignUp, "confirmPassword">, unknown> {
  const {push} = useRouter();

  return useMutation({
    mutationKey: [QueryKeys.signUp],
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      push("/auth/sign-in");
    },
    mutationFn: (data: Omit<ISignUp, "confirmPassword">): Promise<IResponse<undefined>> => authAPI.signUp(data),
  });
}