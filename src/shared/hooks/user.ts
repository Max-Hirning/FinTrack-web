"use client";

import { userService } from "shared/lib";
import { QueryKeys } from "shared/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: [QueryKeys.getUser, userId],
    queryFn: async () => userService.getUser(userId),
  });
};