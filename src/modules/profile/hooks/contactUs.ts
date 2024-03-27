import {IResponse} from "@/types/api";
import {useSession} from "next-auth/react";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {IContactUsForm} from "../types/contactUsFrom";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

export function useContactUs(): UseMutationResult<IResponse<undefined>, unknown, IContactUsForm, unknown> {
  const {data: session} = useSession();

  return useMutation({
    mutationFn: (data: IContactUsForm) => userAPI.contactUs(data, (session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
    onSuccess: async (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    mutationKey: [QueryKeys.deleteUser],
  });
}
