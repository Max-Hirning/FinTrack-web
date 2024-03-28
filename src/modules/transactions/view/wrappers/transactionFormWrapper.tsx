import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {TransactionForm} from "../transactionForm";
import {ICardsFilters, cardAPI} from "@/modules/cards";
import {categoryAPI} from "@/controllers/api/category";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function TransactionFormWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const categories = await categoryAPI.getAll();
  const session = await getServerSession(authOptions);

  const cardsFilters: ICardsFilters = {
    cards: (session?.user as IUserSession).cards
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(cardsFilters)],
    queryFn: () => cardAPI.getAll(cardsFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionForm
        filters={cardsFilters}
        categories={categories.data || []}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}