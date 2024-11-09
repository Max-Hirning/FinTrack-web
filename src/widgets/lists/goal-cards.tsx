import Link from "next/link";
import { Suspense } from "react";
import { goalService } from "shared/lib";
import { GoalCardsList } from "features/index";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function GoalCardsListWidget({styles}: IProps) {
  const {id} = await getUserCookies();

  const query = {
    goalIds: [],
    userIds: [id],
    currencies: [],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCards, query],
    queryFn: () => goalService.getGoals(query),
  });

  return (
    <section className={`${styles || ""}`}>
      <article className="flex items-end justify-between mb-[18px]">
        <h2 className="text-2xl font-bold">My Goals</h2>
        <Link 
          href="/accounts"
          className="text-base"
        >+ Add Goal</Link>
      </article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <GoalCardsList userId={id}/>
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}