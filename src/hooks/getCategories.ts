"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useSuspenseQuery} from "@tanstack/react-query";
import {categoryAPI} from "@/controllers/api/category";

export function useGetCategories() {
  return useSuspenseQuery({
    queryKey: [QueryKeys.getCategories],
    queryFn: () => categoryAPI.getAll(),
  });
}