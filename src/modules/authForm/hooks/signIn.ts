"use client";

import {IResponse} from "@/types/api";
import {signIn} from "next-auth/react";
import {ISignIn} from "../types/signIn";
import {useRouter} from "next/navigation";
import {QueryKeys} from "@/configs/queryKeys";
import {useMutation} from "@tanstack/react-query";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";

export function useSignIn() {
  const {push} = useRouter();

  return useMutation({
    mutationFn: async (data: ISignIn): Promise<IResponse<undefined>> => {
      const response = await signIn("credentials", {...data, redirect: false});
      if(response?.ok) {
        return({
          statusCode: 200,
          message: "You've been authorized"
        });
      } else {
        if(response?.error) {
          throw({
            statusCode: 404,
            message: response.error
          });
        }
      }
      return {
        statusCode: 500,
        message: "An unexpected error occurred",
      };
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      push("/settings");
    },
    mutationKey: [QueryKeys.signIn],
  });
}