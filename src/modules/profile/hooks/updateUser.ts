"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {ISettingsForm} from "../types/settingsForm";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateUser(): UseMutationResult<IResponse<undefined>, unknown, ISettingsForm, unknown> {
  const queryClient = useQueryClient();
  const {data: session, update} = useSession();

  return useMutation({
    mutationFn: (data: ISettingsForm): Promise<IResponse<undefined>> => userAPI.update(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>, data: ISettingsForm) => {
      if(data.currency) {
        queryClient.invalidateQueries({queryKey: [QueryKeys.getYearlyStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getWeeklyStatistics]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpenses]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getExpenses]});
        queryClient.invalidateQueries({queryKey: [QueryKeys.getInfo]});
      }
      if(data.lastName || data.firstName) {
        queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
      }
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.updateUser],
  });
}
