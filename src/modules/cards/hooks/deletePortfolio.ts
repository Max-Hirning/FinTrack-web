"use client";

import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {resetPortfolio} from "@/modules/store";
import {IUserSession} from "@/modules/profile";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {portfolioAPI} from "../controllers/api/portfolio";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";

export function useDeletePortfolio(): UseMutationResult<IResponse<undefined>, unknown, void, unknown> {
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const {data: session, update} = useSession();
  const portfolioFormInitialValues = useSelector((state: RootState) => state.portfolioForm);

  return useMutation({
    mutationFn: (): Promise<IResponse<undefined>> => portfolioAPI.delete(portfolioFormInitialValues._id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getPortfolioAssetsStatistics]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getPortfolios]});
      ToastifyCaller(IStatuses.success, success.message);
      dispatch(resetPortfolio());
      update();
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.deletePortfolio],
  });
}
