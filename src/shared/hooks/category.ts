import { categoryService } from "shared/lib";
import { QueryKeys } from "shared/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = (userIds: string[]) => {
  return useQuery({
    queryKey: [QueryKeys.getCategories, userIds],
    queryFn: async () => categoryService.getCategories(userIds),
  });
};