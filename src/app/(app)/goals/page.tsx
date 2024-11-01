import { Suspense } from "react"
import { IFilterStatistic } from "shared/types"
import { queryClient, QueryKeys } from "shared/constants"
import { getUserCookies } from "src/shared/lib/api/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getYearRange, statisticService, userService } from "shared/lib"
import { GoalCardsListWidget, GoalWidget, GoalsTransactionsStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    goalId?: string;
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
    cardIds: [],
    budgetIds: [],
    frequency: "month",
    goalIds: (user?.goals || []).map((el) => el.id),
  };
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getStatistic, statisticQuery],
    queryFn: () => statisticService.getStatistic(statisticQuery)
  });

  return (
    <>
      <GoalCardsListWidget styles="w-full"/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <GoalsTransactionsStatisticsWidget userId={user.id} styles="w-full mt-[24px]"/>
        </Suspense>
      </HydrationBoundary>
      <GoalWidget styles="mt-[24px]" goalId={searchParams.goalId}/>
    </>
  )
}
