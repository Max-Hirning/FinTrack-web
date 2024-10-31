import { Card, CardContent } from "shared/ui";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { getMonthRange, statisticService } from "shared/lib";
import { BudgetCardsListWidget, BudgetWidget, CardsListWidget, CardWidget, ExpensesStatisticsByCards } from "widgets/index"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface IProps {
  searchParams: { 
    cardId?: string;
    budgetId?: string;
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
      <section className="flex max-md:flex-col w-full gap-[25px]">
        <section className="max-md:w-full md:w-[350px]">
          <article className="flex items-end justify-between mb-[5px]">
            <h2 className="text-2xl font-bold">Card Expense Statistics</h2>
          </article>
          <Card className="p-[20px] h-[235px]">
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
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <CardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
        <BudgetCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
      </section>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <CardWidget cardId={searchParams.cardId}/>
        <BudgetWidget budgetId={searchParams.budgetId}/>
      </section>
    </>
  )
}
