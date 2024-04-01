"use client";

import {useRouter} from "next/router";
import {IResponse} from "@/types/api";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {signOut, useSession} from "next-auth/react";
import {ISettingsForm} from "../types/settingsForm";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateUser(): UseMutationResult<IResponse<undefined>, unknown, ISettingsForm, unknown> {
  const {push} = useRouter();
  const queryClient = useQueryClient();
  const {data: session, update} = useSession();

  return useMutation({
    mutationFn: (data: ISettingsForm): Promise<IResponse<undefined>> => userAPI.update(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>, data: ISettingsForm) => {
      if(data.email) {
        push("/auth/sign-in");
        signOut();
      } else {
        if(data.currency) {
          queryClient.invalidateQueries({queryKey: [QueryKeys.getCategoriesExpensesStatistics]});
          queryClient.invalidateQueries({queryKey: [QueryKeys.getMonthlyExpensesStatistics]});
          queryClient.invalidateQueries({queryKey: [QueryKeys.getCardsExpensesStatistics]});
          queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactionsStatistics]});
          queryClient.invalidateQueries({queryKey: [QueryKeys.getAccountStatistics]});
        }
        if(data.lastName || data.firstName) {
          queryClient.invalidateQueries({queryKey: [QueryKeys.getTransactions]});
          queryClient.invalidateQueries({queryKey: [QueryKeys.getCards]});
        }
        update();
      }
      ToastifyCaller(IStatuses.success, success.message);
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.updateUser],
  });
}
