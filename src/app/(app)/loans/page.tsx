import { Suspense } from "react"
import { IFilterStatistic } from "shared/types"
import { queryClient, QueryKeys } from "shared/constants"
import { getUserCookies } from "src/shared/lib/api/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getYearRange, statisticService, userService } from "shared/lib"
import { LoanCardsListWidget, LoanWidget, LoansTransactionsStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    loanId?: string;
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
    goalIds: [],
    cardIds: [],
    budgetIds: [],
    frequency: "month",
    loanIds: (user?.loans || []).map((el) => el.id),
  };
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getStatistic, statisticQuery],
    queryFn: () => statisticService.getStatistic(statisticQuery)
  });

  return (
    <>
      <LoanCardsListWidget styles="w-full"/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <LoansTransactionsStatisticsWidget userId={user.id} styles="w-full mt-[24px]"/>
        </Suspense>
      </HydrationBoundary>
      <LoanWidget styles="mt-[24px]" loanId={searchParams.loanId}/>
    </>
  )
}
