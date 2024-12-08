"use client";

import { categoryService } from "shared/lib";
import { QueryKeys } from "shared/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetCategories = (userIds: string[]) => {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getCategories, userIds],
    queryFn: async () => categoryService.getCategories(userIds),
  });
};