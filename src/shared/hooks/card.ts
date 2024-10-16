"use client";

import { toast } from "react-toastify";
import { ApiError, cardService } from "shared/lib";
import { cardInput, IFilterCards } from "shared/types";
import { queryClient, QueryKeys } from "shared/constants";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateCard = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]})
    },
    mutationFn: (payload: cardInput) => cardService.createCard(payload),
  });
}
export const useUpdateCard = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]})
    },
    mutationFn: ({cardId, ...payload}: cardInput & {cardId: string}) => cardService.updateCard(payload, cardId),
  });
}
export const useDeleteCard = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]})
    },
    mutationKey: [QueryKeys.deleteCard],
    mutationFn: (cardId: string) => cardService.deleteCard(cardId),
  });
}
export const useGetCard = (cardId?: string) => {
  return useQuery({
    queryKey: [QueryKeys.getCard, cardId],
    queryFn: () => cardService.getCard(cardId),
  });
}
export const useGetCards = (query: IFilterCards) => {
  return useQuery({
    queryKey: [QueryKeys.getCards, query],
    queryFn: () => cardService.getCards(query),
  });
}