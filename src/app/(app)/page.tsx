import { Suspense } from "react";
import { Card, CardContent } from "shared/ui";
import { IFilterStatistic } from "shared/types";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getMonthRange, getYearRange, statisticService } from "shared/lib";
import { ExpensesStatisticsByCategories, TransactionsStatisticsWidget, AccountsCardsListWidget, ExpensesStatisticsByCards } from "widgets/index"

export default async function Page() {
  const user = await getUserCookies();
  const {startDate, endDate} = getMonthRange();
  const {startDate: startDateYear, endDate: endDateYear} = getYearRange();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getAccount, user.id],
    queryFn: () => statisticService.getAccount(user.id)
  });

  const categoriesStatisticQuery = {
    endDate,
    startDate,
    cardIds: [],
    userId: user.id,
  };
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCategoriesStatistic, categoriesStatisticQuery],
    queryFn: () => statisticService.getCategories(categoriesStatisticQuery)
  });

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

  const cardsStatisticQuery = {
    endDate,
    startDate,
    cardIds: [],
    userId: user.id,
  };
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCardsStatistic, cardsStatisticQuery],
    queryFn: () => statisticService.getCards(cardsStatisticQuery)
  });


  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <AccountsCardsListWidget userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <TransactionsStatisticsWidget userId={user.id} styles="w-full mt-[24px]"/>
        </Suspense>
      </HydrationBoundary>
      <section className="flex gap-[24px] mt-[24px]">
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
        <section className="max-md:w-full md:w-[350px]">
          <article className="flex items-end justify-between mb-[18px]">
            <h2 className="text-2xl font-bold">Expense Statistics</h2>
          </article>
          <Card className="h-[350px] p-[20px]">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense>
                <CardContent className="w-full h-full p-0">
                  <ExpensesStatisticsByCategories userId={user.id}/>
                </CardContent>
              </Suspense>
            </HydrationBoundary>
          </Card>
        </section>
      </section>
    </>
  )
}
