"use client";

import { toast } from "react-toastify";
import { ApiError, authService } from "shared/lib";
import { useMutation } from "@tanstack/react-query";
import { checkCodeInput, resetPasswordInput, sendCodeInput, signInInput, signUpInput } from "shared/types";

export const useSignUp = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    mutationFn: async (data: signUpInput) => authService.signUpUser(data),
  });
};
export const useSignIn = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    mutationFn: async (data: signInInput) => authService.signInUser(data),
  });
};
export const useSendCode = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    mutationFn: async (data: sendCodeInput) => authService.sendCode(data),
  });
};
export const useCheckCode = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    mutationFn: async (data: checkCodeInput) => authService.checkCode({...data, email: ""}),
  });
};
export const useResetPassword = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    mutationFn: async (data: Omit<resetPasswordInput, "confirmPassword">) => authService.resetPassword({...data, email: ""}),
  });
};