"use client";

import { toast } from "react-toastify";
import { ApiError, userService } from "shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { preferencesInput, profileInput, settingsInput } from "shared/types";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: [QueryKeys.getUser, userId],
    queryFn: async () => userService.getUser(userId),
  });
};
export const useDeleteUser = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUser]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoan]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCard]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransaction]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationKey: [QueryKeys.deleteUser],
    mutationFn: async (userId: string) => userService.deleteUser(userId),
  });
};
export const useUpdateUser = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUser]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationFn: async ({userId, ...payload}: (profileInput | preferencesInput) & {userId: string}) => userService.updateUser(payload, userId),
  });
};
export const useUpdateUserPassword = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
    },
    mutationFn: async ({userId, ...payload}: settingsInput & {userId: string}) => userService.updateUserPassword(payload, userId),
  });
};