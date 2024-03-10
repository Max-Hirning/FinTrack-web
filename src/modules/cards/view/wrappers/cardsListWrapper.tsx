import React from "react";
import {CardsList} from "../cardsList";
import {getServerSession} from "next-auth";
import {cardAPI} from "../../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

interface IProps {
  elStyle: "card"|"line";
}

export async function CardsListWrapper({elStyle}: IProps) {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, (session?.user as IUserSession).id],
    queryFn: () => cardAPI.getAll((session?.user as IUserSession).id, (session?.user as IUserSession).jwt),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardsList 
        elStyle={elStyle} 
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}