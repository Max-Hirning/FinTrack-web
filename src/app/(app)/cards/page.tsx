import { Suspense } from "react"
import { Card, CardContent } from "shared/ui"
import { queryClient, QueryKeys } from "shared/constants"
import { getUserCookies } from "src/shared/lib/api/server"
import { getMonthRange, statisticService } from "shared/lib"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { CardsListWidget, CardWidget, ExpensesStatisticsByCards, TransactionsStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    cardId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const user = await getUserCookies();
  const {startDate, endDate} = getMonthRange();

  const query = {
    endDate,
    startDate,
    cardIds: [],
    userId: user.id,
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCardsStatistic, query],
    queryFn: () => statisticService.getCards(query)
  });

  return (
    <>
      <CardsListWidget styles="w-full"/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <TransactionsStatisticsWidget userId={user.id} styles="w-full mt-[24px]"/>
        </Suspense>
      </HydrationBoundary>
      <section className="flex gap-[24px] mt-[24px]">
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
