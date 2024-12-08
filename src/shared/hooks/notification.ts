import { QueryKeys } from "../constants";
import { notificationService } from "../lib";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const useGetNotifications = () => {
  return useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.getNotifications],
    queryFn: ({pageParam}) => notificationService.getNotifications({page: pageParam}),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}