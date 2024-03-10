import React from "react";
import {CardForm} from "../cardForm";
import {QueryKeys} from "@/configs/queryKeys";
import {currencyAPI} from "@/controllers/api/currency";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function CardFormWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => currencyAPI.getAll(),
    queryKey: [QueryKeys.getCurrencies],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardForm/>
    </HydrationBoundary>
  );
}
