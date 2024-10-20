import { Suspense } from "react";
import { Card, CardContent } from "shared/ui";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { getMonthRange, statisticService } from "src/shared/lib";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { CardsListWidget, ExpensesStatisticsByCategories, TransactionsStatisticsWidget, TransactionsListWidget, TransactionWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    transactionId?: string;
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
    queryKey: [QueryKeys.getCategoriesStatistic, query],
    queryFn: () => statisticService.getCategories(query)
  });

  return (
    <>
      <section className="flex max-md:flex-col w-full gap-[25px]">
        <CardsListWidget styles="max-md:w-full md:w-[calc(100%-350px-25px)]"/>
        <TransactionsListWidget/>
      </section>
      <section className="flex max-md:flex-col w-full gap-[25px] mt-[25px]">
        <TransactionsStatisticsWidget styles="max-md:w-full md:w-[calc(100%-350px-25px)]"/>
        <section className="max-md:w-full md:w-[350px]">
          <article className="flex items-end justify-between mb-[5px]">
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
      <section className="flex max-md:flex-col w-full gap-[25px] mt-[25px]">
        <TransactionWidget transactionId={searchParams.transactionId}/>
      </section>
    </>
  )
}
