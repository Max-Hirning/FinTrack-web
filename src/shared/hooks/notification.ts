import { QueryKeys } from "../constants";
import { notificationService } from "../lib";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetNotifications = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.getNotifications],
    queryFn: ({pageParam}) => notificationService.getNotifications({page: pageParam}),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}