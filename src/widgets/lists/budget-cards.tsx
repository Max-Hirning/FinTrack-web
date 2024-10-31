import Link from "next/link";
import { BudgetCardsList } from "features/index";
import { queryClient, QueryKeys } from "shared/constants";
import { budgetService } from "shared/lib";
import { getUserCookies } from "src/shared/lib/api/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

interface IProps {
  styles?: string;
}

export async function BudgetCardsListWidget({styles}: IProps) {
  const user = await getUserCookies();

  const query = {
    budgetIds: [],
    currencies: [],
    userIds: [user.id],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getBudgets, query],
    queryFn: () => budgetService.getBudgets(query),
  });

  return (
    <section className={`${styles || ""}`}>
      <article className="flex items-end justify-between mb-[18px]">
        <h2 className="text-2xl font-bold">My Budgets</h2>
        <Link 
          href="/accounts"
          className="text-base"
        >+ Add Budget</Link>
      </article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <BudgetCardsList userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}