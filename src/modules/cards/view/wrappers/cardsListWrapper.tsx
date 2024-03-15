import React from "react";
import {CardsList} from "../cardsList";
import {getServerSession} from "next-auth";
import {cardAPI} from "../../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {ICardsFilters} from "../../types/card";
import {authOptions} from "@/configs/authOptions";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

interface IProps {
  elStyle: "card"|"line";
}

export async function CardsListWrapper({elStyle}: IProps) {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);
  const filters: Pick<ICardsFilters, "ownerId"> = {ownerId: (session?.user as IUserSession).id};

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, JSON.stringify(filters)],
    queryFn: () => cardAPI.getAll(filters, (session?.user as IUserSession).jwt),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardsList 
        elStyle={elStyle} 
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}