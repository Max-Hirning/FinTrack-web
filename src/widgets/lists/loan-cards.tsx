import Link from "next/link";
import { LoanCardsList } from "features/index";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { queryClient, QueryKeys } from "src/shared/constants";
import { goalService, loanService } from "src/shared/lib";
import { getUserCookies } from "src/shared/lib/api/server";

interface IProps {
  styles?: string;
}

export async function LoanCardsListWidget({styles}: IProps) {
  const user = await getUserCookies();

  const query = {
    loanIds: [],
    currencies: [],
    userIds: [user.id],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getLoans, query],
    queryFn: () => loanService.getLoans(query),
  });

  return (
    <section className={`${styles || ""}`}>
      <article className="flex items-end justify-between mb-[18px]">
        <h2 className="text-2xl font-bold">My Loans</h2>
        <Link 
          href="/accounts"
          className="text-base"
        >+ Add Loan</Link>
      </article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <LoanCardsList userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}