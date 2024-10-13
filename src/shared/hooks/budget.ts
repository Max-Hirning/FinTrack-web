"use client";

import { toast } from "react-toastify";
import { ApiError, budgetService } from "shared/lib";
import { budgetInput, IFilterBudgets } from "shared/types";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateBudget = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBudgets]})
    },
    mutationFn: (payload: budgetInput) => budgetService.createBudget(payload),
  });
}
export const useUpdateBudget = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBudgets]})
    },
    mutationFn: ({budgetId, ...payload}: budgetInput & {budgetId: string}) => budgetService.updateBudget(payload, budgetId),
  });
}
export const useDeleteBudget = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getBudgets]})
    },
    mutationKey: [QueryKeys.deleteBudget],
    mutationFn: (budgetId: string) => budgetService.deleteBudget(budgetId),
  });
}
export const useGetBudget = (budgetId?: string) => {
  return useQuery({
    queryKey: [QueryKeys.getBudget, budgetId],
    queryFn: () => budgetService.getBudget(budgetId),
  });
}
export const useGetBudgets = (query: IFilterBudgets) => {
  return useQuery({
    queryKey: [QueryKeys.getBudgets, query],
    queryFn: () => budgetService.getBudgets(query),
  });
}