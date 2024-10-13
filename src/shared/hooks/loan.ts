"use client";

import { toast } from "react-toastify";
import { ApiError, loanService } from "shared/lib";
import { loanInput, IFilterLoans } from "shared/types";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateLoan = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
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
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
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
      queryClient.invalidateQueries({queryKey: [QueryKeys.getLoans]})
    },
    mutationKey: [QueryKeys.deleteLoan],
    mutationFn: (loanId: string) => loanService.deleteLoan(loanId),
  });
}
export const useGetLoan = (loanId?: string) => {
  return useQuery({
    queryKey: [QueryKeys.getLoan, loanId],
    queryFn: () => loanService.getLoan(loanId),
  });
}
export const useGetLoans = (query: IFilterLoans) => {
  return useQuery({
    queryKey: [QueryKeys.getLoans, query],
    queryFn: () => loanService.getLoans(query),
  });
}