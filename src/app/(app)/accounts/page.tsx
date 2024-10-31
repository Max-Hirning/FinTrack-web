import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { queryClient, QueryKeys } from "src/shared/constants";
import { statisticService } from "src/shared/lib";
import { getUserCookies } from "src/shared/lib/api/server";
import { AccountsCardsListWidget, GoalWidget, LoanWidget, GoalCardsListWidget, LoanCardsListWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    goalId?: string;
    loanId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const user = await getUserCookies();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getAccount, user.id],
    queryFn: () => statisticService.getAccount(user.id)
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <AccountsCardsListWidget userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <LoanCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
        <GoalCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
      </section>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <GoalWidget goalId={searchParams.goalId}/>
        <LoanWidget loanId={searchParams.loanId}/>
      </section>
    </>
  )
}
