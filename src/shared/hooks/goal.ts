"use client";

import { toast } from "react-toastify";
import { ApiError, goalService } from "shared/lib";
import { goalInput, IFilterGoals } from "shared/types";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateGoal = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoal]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getGoals]})
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
    },
    mutationKey: [QueryKeys.deleteGoal],
    mutationFn: (goalId: string) => goalService.deleteGoal(goalId),
  });
}
export const useGetGoal = (goalId?: string) => {
  return useQuery({
    queryKey: [QueryKeys.getGoal, goalId],
    queryFn: () => goalService.getGoal(goalId),
  });
}
export const useGetGoals = (query: IFilterGoals) => {
  return useQuery({
    queryKey: [QueryKeys.getGoals, query],
    queryFn: () => goalService.getGoals(query),
  });
}