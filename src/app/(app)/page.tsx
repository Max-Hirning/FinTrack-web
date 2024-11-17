import { Suspense } from "react";
import { TransactionForm } from "src/features";
import { Card, CardContent, Skeleton } from "shared/ui";
import { getUserCookies } from "src/shared/lib/api/server";
import { ExpensesStatisticsByCategories, TransactionsStatisticsWidget, AccountsCardsListWidget, ExpensesStatisticsByCards, AccountsCardsListSkeleton } from "widgets/index"

interface IProps {
  searchParams: { 
    transactionId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const user = await getUserCookies();

  return (
    <>
      <Suspense fallback={<AccountsCardsListSkeleton/>}>
        <AccountsCardsListWidget userId={user.id}/>
      </Suspense>
      <section className="w-full mt-[24px] flex flex-col gap-[24px]">
        <article className="flex items-end justify-between mb-[5px]">
          <h2 className="text-2xl font-bold">Expense/Income Statistics</h2>
        </article>
        <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
          <TransactionsStatisticsWidget userId={user.id}/>
        </Suspense>
      </section>
      <section className="flex gap-[24px] mt-[24px] flex-wrap">
        <section className="max-md:w-full md:w-[350px]">
          <article className="flex items-end justify-between mb-[18px]">
            <h2 className="text-2xl font-bold">Card Expense Statistics</h2>
          </article>
          <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
            <Card className="p-[20px] h-[350px]">
              <CardContent className="w-full h-full p-0">
                <ExpensesStatisticsByCards userId={user.id}/>
              </CardContent>
            </Card>
          </Suspense>
        </section>
        <section className="max-md:w-full md:w-[350px]">
          <article className="flex items-end justify-between mb-[18px]">
            <h2 className="text-2xl font-bold">Expense Statistics</h2>
          </article>
          <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
            <Card className="h-[350px] p-[20px]">
              <CardContent className="w-full h-full p-0">
                <ExpensesStatisticsByCategories userId={user.id}/>
              </CardContent>
            </Card>
          </Suspense>
        </section>
      </section>
      <section className="w-full max-w-[600px]">
        <h2 className="mb-[18px] text-2xl font-bold">Transaction form</h2>
        <Suspense fallback={<Skeleton className="w-full min-h-[500px]"/>}>
          <Card className="p-[24px] w-full min-h-[500px]">
            <TransactionForm transactionId={searchParams.transactionId} userId={user.id}/>
          </Card>
        </Suspense>
      </section>
    </>
  )
}
