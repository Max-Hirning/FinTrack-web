"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {categoryAPI} from "@/controllers/api/category";

export function useGetCategories() {
  return useQuery({
    queryKey: [QueryKeys.getCategories],
    queryFn: () => categoryAPI.getAll(),
  });
}