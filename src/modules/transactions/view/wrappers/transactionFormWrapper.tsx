import React from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {TransactionForm} from "../transactionForm";
import {ICardsFilters, cardAPI} from "@/modules/cards";
import {categoryAPI} from "@/controllers/api/category";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function TransactionFormWrapper() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);
  const filters: Pick<ICardsFilters, "ownerId"> = {ownerId: (session?.user as IUserSession).id};

  await queryClient.prefetchQuery({
    queryFn: () => categoryAPI.getAll(),
    queryKey: [QueryKeys.getCategories],
  });

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(filters)],
    queryFn: () => cardAPI.getAll(filters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionForm
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}
