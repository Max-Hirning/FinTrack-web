"use client";

import {IResponse} from "@/types/api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/types/store";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {portfolioAPI} from "../controllers/api/portfolio";
import {IPortfolioForm, resetPortfolio} from "@/modules/store";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdatePortfolio(): UseMutationResult<IResponse<undefined>, unknown, IPortfolioForm, unknown> {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation({
    mutationFn: ({_id, ...data}: IPortfolioForm): Promise<IResponse<undefined>> => portfolioAPI.update(data, _id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getPortfolioAssetsStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getPortfolios]});
      ToastifyCaller(IStatuses.success, success.message);
      dispatch(resetPortfolio());
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.updatePortfolio],
  });
}
