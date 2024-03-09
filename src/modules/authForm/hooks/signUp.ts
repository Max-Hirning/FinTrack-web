"use client";

import {IResponse} from "@/types/api";
import {ISignUp} from "../types/signUp";
import {useRouter} from "next/navigation";
import {authAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useMutation} from "@tanstack/react-query";

export function useSignUp() {
  const {push} = useRouter();

  return useMutation({
    mutationKey: [QueryKeys.signUp],
    onError: (error: IResponse<undefined>) => {
      console.log(error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      console.log(success.message);
      push("/auth/sign-in");
    },
    mutationFn: (data: Omit<ISignUp, "confirmPassword">): Promise<IResponse<undefined>> => authAPI.signUp(data),
  });
}