import { Suspense } from "react"
import { transactionService } from "shared/lib"
import { TransactionsTable } from "features/index"
import { queryClient, QueryKeys } from "shared/constants"
import { HydrationBoundary } from "@tanstack/react-query"
import { getUserCookies } from "src/shared/lib/api/server"
import { CardsListWidget, ExpensesStatisticsWidget } from "widgets/index"

export default async function Page() {
  const user = await getUserCookies();

  const query = {
    page: 1,
    loanIds: [],
    goalIds: [],
    cardIds: [],
    budgetIds: [],
    currencies: [],
    userIds: [user.id],
    transactionIds: [],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getTransactions, query],
    queryFn: () => transactionService.getTransactions(query),
  });

  return (
    <>
      <section className="flex max-md:flex-col w-full gap-[25px]">
        <CardsListWidget styles="max-md:w-full md:w-[calc(100%-350px-25px)]"/>
        <ExpensesStatisticsWidget/>
      </section>
      <section className="mt-[25px] w-full">
        <article className="flex items-end justify-between mb-[5px]">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
        </article>
        <HydrationBoundary>
          <Suspense>
            <TransactionsTable userId={user.id}/>
          </Suspense>
        </HydrationBoundary>
      </section>
    </>
  )
}
