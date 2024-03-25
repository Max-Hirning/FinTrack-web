import Link from "next/link";
import {Metadata} from "next";
import React, {Suspense} from "react";
import {getServerSession} from "next-auth";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {CardsList, ICardsFilters} from "@/modules/cards";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {TransactionSkeleton} from "@/components/skeletons/Transaction";
import {getCurrentMonthRange, getCurrentYearRange} from "@/controllers/dates";
import {ITransactionsFilters, TransactionsList} from "@/modules/transactions";
import {AccountInfoCardSkeleton} from "@/components/skeletons/AccountInfoCard";
import {Accounts, IAccountFilters, IYearlyStatisticsFilters, YearlyStatistics} from "@/modules/analytics";

export const metadata: Metadata = {
  description: "Overview you finance info"
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  const accountsfilters: IAccountFilters = {
    currency: (session?.user as IUserSession).currency, 
    cards: {cards: (session?.user as IUserSession).cards}, 
    transactions: {cards: (session?.user as IUserSession).cards, date: getCurrentMonthRange()},
  };

  const yearlyFilters: IYearlyStatisticsFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, date: getCurrentYearRange()}
  };

  const cardsFilters: Pick<ICardsFilters, "ownerId"> = {
    ownerId: (session?.user as IUserSession).id
  };

  const transactionsFilters: Omit<ITransactionsFilters, "date"> = {
    page: 1,
    perPage: 10,
    cards: (session?.user as IUserSession).cards,
  };

  return (
    <>
      <section className="flex gap-[25px] pb-[5px] overflow-auto max-w-fit">
        <Suspense fallback={
          <>
            <AccountInfoCardSkeleton/>
            <AccountInfoCardSkeleton/>
            <AccountInfoCardSkeleton/>
          </>
        }>
          <Accounts
            filters={accountsfilters}
            session={session?.user as IUserSession}
          />
        </Suspense>
      </section>
      <section className="max-1.5xl:flex-col mt-[25px] flex gap-[25px]">
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Last Transaction</h1>
          <section className="max-w-fit card h-[235px] p-[20px] gap-y-[20px] flex flex-col overflow-auto">
            <Suspense fallback={
              <>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
              </>
            }>
              <TransactionsList
                filters={transactionsFilters}
                session={session?.user as IUserSession}
              />
            </Suspense>
          </section>
        </section>
        <section className="max-1.5xl:w-full 1.5xl:w-[350px]">
          <article className="flex items-end justify-between mb-[10px]">
            <h1 className="title font-semibold text-[22px] text-text">My Cards</h1>
            <Link 
              href="/cards"
              aria-label="See all cards"
              className="title font-semibold text-[17px] text-text mb-[2px] ml-[10px]"
            >See All</Link>
          </article>
          <section className="flex gap-[25px] pb-[5px] overflow-auto">
            <Suspense fallback={
              <>
                <BankCardSkeleton/>
                <BankCardSkeleton/>
                <BankCardSkeleton/>
                <BankCardSkeleton/>
              </>
            }>
              <CardsList 
                elStyle="card"
                filters={cardsFilters}
                session={session?.user as IUserSession}
              />
            </Suspense>
          </section>
        </section>
      </section>
      <section className="w-full max-w-[730px] mt-[25px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Debit & Credit Overview</h1>
        <Suspense fallback={<section className="bg-slate-200 card border w-full h-[364px] animate-pulse"></section>}>
          <section className="card w-full p-[25px] h-[364px]">
            <YearlyStatistics
              filters={yearlyFilters}
              session={session?.user as IUserSession}
            />
          </section>
        </Suspense>
      </section>
    </>
  );
}