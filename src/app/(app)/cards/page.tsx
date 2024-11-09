import { Suspense } from "react"
import { Card, CardContent } from "shared/ui"
import { IFilterStatistic } from "shared/types"
import { queryClient, QueryKeys } from "shared/constants"
import { getUserCookies } from "src/shared/lib/api/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getMonthRange, statisticService, userService } from "shared/lib"
import { CardsListWidget, CardWidget, ExpensesStatisticsByCards, CardsTransactionsStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    cardId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const {id} = await getUserCookies();
  const user = await userService.getUser(id);
  const {startDate, endDate} = getMonthRange();

  const statisticQuery: IFilterStatistic = {
    endDate,
    startDate,
    userId: id,
    loanIds: [],
    goalIds: [],
    budgetIds: [],
    frequency: "month",
    cardIds: (user?.cards || []).map((el) => el.id),
  };
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getStatistic, statisticQuery],
    queryFn: () => statisticService.getStatistic(statisticQuery)
  });

  return (
    <>
      <CardsListWidget styles="w-full"/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <CardsTransactionsStatisticsWidget userId={id} styles="w-full mt-[24px]"/>
        </Suspense>
      </HydrationBoundary>
      <section className="flex gap-[24px] mt-[24px] flex-wrap">
        <CardWidget cardId={searchParams.cardId}/>
        <section className="max-md:w-full md:w-[350px]">
          <article className="flex items-end justify-between mb-[18px]">
            <h2 className="text-2xl font-bold">Card Expense Statistics</h2>
          </article>
          <Card className="p-[20px] h-[350px]">
            <CardContent className="w-full h-full p-0">
              <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense>
                  <ExpensesStatisticsByCards userId={user.id}/>
                </Suspense>
              </HydrationBoundary>
            </CardContent>
          </Card>
        </section>
      </section>
    </>
  )
}
