import Link from "next/link";
import { Suspense } from "react";
import { budgetService } from "shared/lib";
import { BudgetCardsList } from "features/index";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function BudgetCardsListWidget({styles}: IProps) {
  const {id} = await getUserCookies();

  const query = {
    budgetIds: [],
    userIds: [id],
    currencies: [],
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
          <BudgetCardsList userId={id}/>
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}