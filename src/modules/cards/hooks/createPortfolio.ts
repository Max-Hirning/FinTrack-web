"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IPortfolioForm} from "@/modules/store";
import {IUserSession} from "@/modules/profile";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {portfolioAPI} from "../controllers/api/portfolio";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreatePortfolio(): UseMutationResult<IResponse<undefined>, unknown, Omit<IPortfolioForm, "_id">, unknown> {
  const queryClient = useQueryClient();
  const {data: session, update} = useSession();
  
  return useMutation({
    mutationFn: (data: Omit<IPortfolioForm, "_id">): Promise<IResponse<undefined>> => portfolioAPI.create(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getPortfolios]});
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.createPortfolio],
  });
}
