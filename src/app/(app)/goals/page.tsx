import Link from "next/link"
import { Suspense } from "react"
import { Card, Skeleton } from "shared/ui"
import { GoalCardsList, GoalForm } from "features/index"
import { getUserCookies } from "src/shared/lib/api/server"
import { CardsListSkeleton, GoalsTransactionsStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    goalId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const {id} = await getUserCookies();

  return (
    <>
      <section className="w-full">
        <article className="flex items-end justify-between mb-[18px]">
          <h2 className="text-2xl font-bold">My Goals</h2>
          <Link 
            href="/accounts"
            className="text-base"
          >+ Add Goal</Link>
        </article>
        <Suspense fallback={<CardsListSkeleton/>}>
          <GoalCardsList userId={id}/>
        </Suspense>
      </section>
      <section className="w-full mt-[24px]">
        <article className="flex items-end justify-between mb-[18px]">
          <h2 className="text-2xl font-bold">Goals Expense/Income Statistics</h2>
        </article>
        <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
          <GoalsTransactionsStatisticsWidget userId={id} />
        </Suspense>
      </section>
      <section className="w-full max-w-[600px] mt-[24px]">
        <h2 className="mb-[18px] text-2xl font-bold">Goal form</h2>
        <Suspense fallback={<Skeleton className="w-full min-h-[400px]"/>}>
          <Card className="p-[24px] w-full min-h-[400px]">
            <GoalForm goalId={searchParams.goalId}/>
          </Card>
        </Suspense>
      </section>
    </>
  )
}
