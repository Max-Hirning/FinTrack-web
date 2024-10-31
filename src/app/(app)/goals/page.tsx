import { Suspense } from "react"
import { Card, CardContent } from "shared/ui"
import { queryClient, QueryKeys } from "shared/constants"
import { getUserCookies } from "src/shared/lib/api/server"
import { getMonthRange, getYearRange, statisticService } from "shared/lib"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { BudgetCardsListWidget, BudgetWidget, CardsListWidget, CardWidget, ExpensesStatisticsByCards, GoalCardsListWidget, GoalWidget, TransactionsStatisticsWidget } from "widgets/index"
import { IFilterStatistic } from "src/shared/types"

interface IProps {
  searchParams: { 
    goalId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const user = await getUserCookies();
  const {startDate: startDateYear, endDate: endDateYear} = getYearRange();

  const statisticQuery: IFilterStatistic = {
    cardIds: [],
    userId: user.id,
    frequency: "month",
    endDate: endDateYear,
    startDate: startDateYear,
  }
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getStatistic, statisticQuery],
    queryFn: () => statisticService.getStatistic(statisticQuery)
  });

  return (
    <>
      <GoalCardsListWidget styles="w-full"/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <TransactionsStatisticsWidget userId={user.id} styles="w-full mt-[24px]"/>
        </Suspense>
      </HydrationBoundary>
      <GoalWidget styles="mt-[24px]" goalId={searchParams.goalId}/>
    </>
  )
}
