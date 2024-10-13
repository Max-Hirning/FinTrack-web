import Link from "next/link";
import { GoalCardsList } from "features/index";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { queryClient, QueryKeys } from "shared/constants";
import { goalService } from "shared/lib";
import { getUserCookies } from "src/shared/lib/api/server";

interface IProps {
  styles?: string;
}

export async function GoalCardsListWidget({styles}: IProps) {
  const user = await getUserCookies();

  const query = {
    goalIds: [],
    currencies: [],
    userIds: [user.id],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCards, query],
    queryFn: () => goalService.getGoals(query),
  });

  return (
    <section className={`${styles || ""}`}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">My Goals</h2>
        <Link 
          href="/accounts"
          className="text-base"
        >+ Add Goal</Link>
      </article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <GoalCardsList userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}