"use client";

import { toast } from "react-toastify";
import { ApiError, fileService } from "shared/lib";
import { useMutation } from "@tanstack/react-query";
import { queryClient, QueryKeys } from "shared/constants";

export const useDeleteProfileAvatar = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUser]})
    },
    mutationFn: async () => fileService.deleteProfileAvatar(),
  });
};
export const useUpdateProfileAvatar = () => {
  return useMutation({
    onError(error: ApiError) {
      toast.error(error.data as string);
    },
    onSuccess(message: string) {
      toast.success(message);
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUser]})
    },
    mutationFn: async (payload: File) => {
      const formData = new FormData();
      formData.append("avatar", payload)
      return await fileService.updateProfileAvatar(formData)
    },
  });
};