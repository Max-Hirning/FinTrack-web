"use client";

import { toast } from "react-toastify";
import { ApiError, goalService } from "shared/lib";
import { goalInput, IFilterGoals } from "shared/types";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

export const useCreateGoal = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationFn: (payload: goalInput) => goalService.createGoal(payload),
  });
}
export const useUpdateGoal = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationFn: ({goalId, ...payload}: goalInput & {goalId: string}) => goalService.updateGoal(payload, goalId),
  });
}
export const useDeleteGoal = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationKey: [QueryKeys.deleteGoal],
    mutationFn: (goalId: string) => goalService.deleteGoal(goalId),
  });
}
export const useGetGoal = (goalId?: string) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getGoal, goalId],
    queryFn: () => goalService.getGoal(goalId),
  });
}
export const useGetGoals = (query: IFilterGoals) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getGoals, query],
    queryFn: () => goalService.getGoals(query),
  });
}