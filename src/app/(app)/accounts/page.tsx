import Link from "next/link";
import {Metadata} from "next";
import {CardsListWrapper} from "@/modules/cards";
import React, {ReactElement, Suspense} from "react";
import {getCurrentYearRange} from "@/controllers/dates";
import {TransactionsListWrapper} from "@/modules/transactions";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {TransactionSkeleton} from "@/components/skeletons/Transaction";
import {AccountInfoCardSkeleton} from "@/components/skeletons/AccountInfoCard";
import {AccountStatisticsWrapper, TransactionsStatisticsWrapper} from "@/modules/analytics";

export const metadata: Metadata = {
  description: "Overview you finance info"
};

export default function Page(): ReactElement {
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
          <AccountStatisticsWrapper/>
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
              <TransactionsListWrapper/>
            </Suspense>
          </section>
        </section>
        <section className="max-w-fit max-1.5xl:w-full 1.5xl:w-[350px]">
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
              <CardsListWrapper elStyle="card"/>
            </Suspense>
          </section>
        </section>
      </section>
      <section className="w-full max-w-[730px] mt-[25px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Debit & Credit Overview</h1>
        <Suspense fallback={<section className="bg-slate-200 card border w-full h-[364px] animate-pulse"></section>}>
          <section className="card w-full flex justify-center items-center p-[25px] h-[364px]">
            <TransactionsStatisticsWrapper
              frequency="m"
              range={getCurrentYearRange()}
              label="Transactions yearly statistics(current year)"
            />
          </section>
        </Suspense>
      </section>
    </>
  );
}