import Link from "next/link"
import { Suspense } from "react"
import { Card, Skeleton } from "shared/ui"
import { userService } from "shared/lib"
import { LoanCardsList, LoanForm } from "src/features"
import { getUserCookies } from "src/shared/lib/api/server"
import { CardsListSkeleton, LoansTransactionsStatisticsWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    loanId?: string;
  }
}

export default async function Page({searchParams}: IProps) {
  const {id} = await getUserCookies();
  const user = await userService.getUser(id);

  return (
    <>
      <section className="w-full">
        <article className="flex items-end justify-between mb-[18px]">
          <h2 className="text-2xl font-bold">My Loans</h2>
          <Link 
            href="/loans"
            className="text-base"
          >+ Add Loan</Link>
        </article>
        <Suspense fallback={<CardsListSkeleton/>}>
          <LoanCardsList userId={user.id}/>
        </Suspense>
      </section>
      <section className="w-full mt-[24px]">
        <article className="flex items-end justify-between mb-[18px]">
          <h2 className="text-2xl font-bold">Loans Expense/Income Statistics</h2>
        </article>
        <Suspense fallback={<Skeleton className="h-[350px] w-full"/>}>
          <LoansTransactionsStatisticsWidget userId={user.id} />
        </Suspense>
      </section>
      <section className="w-full max-w-[600px] mt-[24px]">
        <h2 className="mb-[18px] text-2xl font-bold">Loan form</h2>
        <Suspense fallback={<Skeleton className="w-full min-h-[400px]"/>}>
          <Card className="p-[24px] w-full min-h-[400px]">
            <LoanForm loanId={searchParams.loanId}/>
          </Card>
        </Suspense>
      </section>
    </>
  )
}
