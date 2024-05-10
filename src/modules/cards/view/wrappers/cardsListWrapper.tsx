import {CardsList} from "../cardsList";
import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {ICardsFilters} from "../../types/card";
import {authOptions} from "@/configs/authOptions";
import {cardAPI} from "../../controllers/api/card";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function CardsListWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const cardsFilters: Pick<ICardsFilters, "ownerId"> = {
    ownerId: (session?.user as IUserSession).id
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(cardsFilters)],
    queryFn: () => cardAPI.getAll(cardsFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardsList
        filters={cardsFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}