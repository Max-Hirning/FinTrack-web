"use client";

import { toast } from "react-toastify";
import { ApiError, loanService } from "shared/lib";
import { loanInput, IFilterLoans } from "shared/types";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

export const useCreateLoan = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoan]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationFn: (payload: loanInput) => loanService.createLoan(payload),
  });
}
export const useUpdateLoan = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoan]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationFn: ({loanId, ...payload}: loanInput & {loanId: string}) => loanService.updateLoan(payload, loanId),
  });
}
export const useDeleteLoan = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoan]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsStatistic]})
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesStatistic]})
    },
    mutationKey: [QueryKeys.deleteLoan],
    mutationFn: (loanId: string) => loanService.deleteLoan(loanId),
  });
}
export const useGetLoan = (loanId?: string) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getLoan, loanId],
    queryFn: () => loanService.getLoan(loanId),
  });
}
export const useGetLoans = (query: IFilterLoans) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getLoans, query],
    queryFn: () => loanService.getLoans(query),
  });
}