import Link from "next/link";
import {Metadata} from "next";
import {CardsListWrapper} from "@/modules/cards";
import React, {ReactElement, Suspense} from "react";
import {ExpenseStatisticsWrapper} from "@/modules/analytics";
import {TransactionsListWrapper} from "@/modules/transactions";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {TransactionSkeleton} from "@/components/skeletons/Transaction";

export const metadata: Metadata = {
  description: "Overview you finances"
};

export default function Page(): ReactElement {
  // const session = await getServerSession(authOptions);

  // const weeklyFilters: IWeeklyStatisticsFilters = {
  //   currency: (session?.user as IUserSession).currency,
  //   filters: {cards: (session?.user as IUserSession).cards, date: getCurrentWeekRange()}
  // };

  return (
    <>
      <section className="max-lg:flex-col flex gap-[25px]">
        <section className="max-lg:w-full lg:min-w-[350px] w-fit">
          <article className="flex items-end justify-between mb-[10px]">
            <h1 className="title font-semibold text-[22px] text-text">My Cards</h1>
            <Link 
              href="/cards"
              className="title font-semibold text-[17px] text-text mb-[2px] ml-[10px]"
            >See All</Link>
          </article>
          <section className="flex gap-[25px] pb-[5px] px-[5px] overflow-auto">
            <Suspense fallback={
              <>
                <BankCardSkeleton/>
                <BankCardSkeleton/>
                <BankCardSkeleton/>
                <BankCardSkeleton/>
              </>
            }>
              <CardsListWrapper elStyle="card"/>
            </Suspense>
          </section>
        </section>
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Recent Transaction</h1>
          <section className="card flex flex-col py-[10px] px-[20px] w-[380px] h-[235px] overflow-auto">
            <Suspense fallback={
              <>
                <TransactionSkeleton shrinked={true}/>
                <TransactionSkeleton shrinked={true}/>
                <TransactionSkeleton shrinked={true}/>
                <TransactionSkeleton shrinked={true}/>
                <TransactionSkeleton shrinked={true}/>
              </>
            }>
              <TransactionsListWrapper shrinked={true}/>
            </Suspense>
          </section>
        </section>
      </section>
      <section className="max-lg:flex-col flex gap-[25px] mt-[25px]">
        {/* <section className="w-full max-w-[730px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Weekly Activity</h1>
          <Suspense fallback={<section className="bg-slate-200 card border w-full h-[322px] p-[25px] animate-pulse"></section>}>
            <section className="card w-full p-[25px] h-[322px]">
              <WeeklyStatistics
                filters={weeklyFilters}
                session={session?.user as IUserSession}
              />
            </section>
          </Suspense>
        </section>*/}
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Expense Statistics</h1>
          <Suspense fallback={<section className="bg-slate-200 card border max-w-[350px] lg:w-[350px] w-full h-[322px] p-[25px] animate-pulse"></section>}>
            <section className="card max-w-[350px] w-full p-[25px] flex justify-center items-center lg:w-[350px] h-[322px]">
              <ExpenseStatisticsWrapper/>
            </section>
          </Suspense>
        </section>
      </section>
    </>
  );
}