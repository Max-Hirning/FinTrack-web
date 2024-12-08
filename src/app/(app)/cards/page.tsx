import Link from "next/link"
import { Suspense } from "react"
import { CardForm, CardsList } from "features/index"
import { Card, CardContent, Skeleton } from "shared/ui"
import { getUserCookies } from "src/shared/lib/api/server"
import { ExpensesStatisticsByCards, CardsTransactionsStatisticsWidget, CardsListSkeleton, ExpensesStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    cardId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const {id} = await getUserCookies();

  return (
    <>
      <section className="gap-[24px] flex flex-wrap max-lg:flex-col-reverse">
        <section className="w-[calc(100%-414px)] max-lg:w-full">
          <article className="flex items-end justify-between mb-[18px]">
            <h2 className="text-2xl font-bold">My Cards</h2>
            <Link 
              href="/cards"
              className="text-base"
            >+ Add Card</Link>
          </article>
          <Suspense fallback={<CardsListSkeleton/>}>
            <CardsList userId={id}/>
          </Suspense>
        </section>
        <section className="w-[390px]">
          <article className="flex items-end justify-between mb-[18px]">
            <h2 className="text-2xl font-bold">My Expense</h2>
          </article>
          <Suspense fallback={<Skeleton className="h-[235px] w-[390px]"/>}>
            <ExpensesStatisticsWidget userId={id}/>
          </Suspense>
        </section>
      </section>
      <section className="w-full mt-[24px]">
        <article className="flex items-end justify-between mb-[18px]">
          <h2 className="text-2xl font-bold">Cards Expense/Income Statistics</h2>
        </article>
        <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
          <CardsTransactionsStatisticsWidget userId={id} />
        </Suspense>
      </section>
      <section className="flex gap-[24px] mt-[24px] flex-wrap-reverse">
        <section className="w-full max-w-[600px]">
          <h2 className="mb-[18px] text-2xl font-bold">Card form</h2>
          <Suspense fallback={<Skeleton className="w-full min-h-[300px]"/>}>
            <Card className="p-[24px] w-full min-h-[300px]">
              <CardForm cardId={searchParams.cardId} />
            </Card>
          </Suspense>
        </section>
        <section className="max-md:w-full md:w-[350px]">
          <article className="flex items-end justify-between mb-[18px]">
            <h2 className="text-2xl font-bold">Card Expense Statistics</h2>
          </article>
          <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
            <Card className="p-[20px] h-[350px]">
              <CardContent className="w-full h-full p-0">
                <ExpensesStatisticsByCards userId={id}/>
              </CardContent>
            </Card>
          </Suspense>
        </section>
      </section>
    </>
  )
}
