import { Suspense } from "react"
import { IFilterStatistic } from "shared/types"
import { queryClient, QueryKeys } from "shared/constants"
import { getUserCookies } from "src/shared/lib/api/server"
import { getYearRange, statisticService, userService } from "shared/lib"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { BudgetCardsListWidget, BudgetWidget, BudgetsTransactionsStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    budgetId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const {id} = await getUserCookies();
  const user = await userService.getUser(id);
  const {startDate, endDate} = getYearRange();

  const statisticQuery: IFilterStatistic = {
    endDate,
    startDate,
    userId: id,
    loanIds: [],
    goalIds: [],
    cardIds: [],
    frequency: "month",
    budgetIds: (user?.budgets || []).map((el) => el.id),
  }
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getStatistic, statisticQuery],
    queryFn: () => statisticService.getStatistic(statisticQuery)
  });

  return (
    <>
      <BudgetCardsListWidget styles="w-full"/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <BudgetsTransactionsStatisticsWidget userId={user.id} styles="w-full mt-[24px]"/>
        </Suspense>
      </HydrationBoundary>
      <BudgetWidget styles="mt-[24px]" budgetId={searchParams.budgetId}/>
    </>
  )
}
