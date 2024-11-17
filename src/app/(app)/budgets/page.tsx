import Link from "next/link"
import { Suspense } from "react"
import { Card, Skeleton } from "shared/ui"
import { getUserCookies } from "src/shared/lib/api/server"
import { BudgetCardsList, BudgetForm } from "features/index"
import { BudgetsTransactionsStatisticsWidget, CardsListSkeleton } from "widgets/index"

interface IProps {
  searchParams: { 
    budgetId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const {id} = await getUserCookies();

  return (
    <>
      <section className="w-full">
        <article className="flex items-end justify-between mb-[18px]">
          <h2 className="text-2xl font-bold">My Budgets</h2>
          <Link 
            href="/cards"
            className="text-base"
          >+ Add Budget</Link>
        </article>
        <Suspense fallback={<CardsListSkeleton/>}>
          <BudgetCardsList userId={id}/>
        </Suspense>
      </section>
      <section className="w-full mt-[24px]">
        <article className="flex items-end justify-between mb-[18px]">
          <h2 className="text-2xl font-bold">Budgets Expense/Income Statistics</h2>
        </article>
        <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
          <BudgetsTransactionsStatisticsWidget userId={id} />
        </Suspense>
      </section>
      <section className="w-full max-w-[600px] mt-[24px]">
        <h2 className="mb-[18px] text-2xl font-bold">Budget form</h2>
        <Suspense fallback={<Skeleton className="h-[500px] w-full"/>}>
          <Card className="p-[24px] w-full h-[500px]">
            <BudgetForm budgetId={searchParams.budgetId} userId={id}/>
          </Card>
        </Suspense>
      </section>
    </>
  )
}
