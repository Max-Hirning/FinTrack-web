import Link from "next/link";
import { Suspense } from "react";
import { CardsList } from "features/index";
import { cardService, userService } from "src/shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function CardsListWidget({styles}: IProps) {
  const {id} = await getUserCookies();

  const query = {
    cardIds: [],
    userIds: [id],
    currencies: [],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCards, query],
    queryFn: () => cardService.getCards(query),
  });

  return (
    <section className={`${styles || ""}`}>
      <article className="flex items-end justify-between mb-[18px]">
        <h2 className="text-2xl font-bold">My Cards</h2>
        <Link 
          href="/cards"
          className="text-base"
        >+ Add Card</Link>
      </article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <CardsList userId={id}/>
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}