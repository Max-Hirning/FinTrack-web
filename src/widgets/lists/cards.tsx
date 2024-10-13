import Link from "next/link";
import { Suspense } from "react";
import { CardsList } from "features/index";
import { cardService } from "src/shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function CardsListWidget({styles}: IProps) {
  const user = await getUserCookies();

  const query = {
    cardIds: [],
    currencies: [],
    userIds: [user.id],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCards, query],
    queryFn: () => cardService.getCards(query),
  });

  return (
    <section className={`${styles || ""}`}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">My Cards</h2>
        <Link 
          href="/cards"
          className="text-base"
        >+ Add Card</Link>
      </article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <CardsList userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}