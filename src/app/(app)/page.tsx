import Link from "next/link";
import React, {Suspense} from "react";
import {CardsListWrapper} from "@/modules/cards";
import {TransactionsListWrapper} from "@/modules/transactions";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {TransactionSkeleton} from "@/components/skeletons/Transaction";

export default function Home() {
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
          <section className="card gap-y-[20px] max-w-fit flex flex-col p-[20px] w-[380px] h-[235px] overflow-auto">
            <Suspense fallback={
              <>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
                <TransactionSkeleton/>
              </>
            }>
              <TransactionsListWrapper shrinked={true}/>
            </Suspense>
          </section>
        </section>
      </section>
      <section className="max-lg:flex-col flex gap-[25px] mt-[25px]">
        <section className="w-full max-w-[730px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Weekly Activity</h1>
          <section className="card w-full h-[322px]"></section>
        </section>
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Expense Statistics</h1>
          <section className="card max-lg:w-full lg:w-[350px] h-[322px]"></section>
        </section>
      </section>
      <section className="max-lg:flex-col flex gap-[25px] mt-[25px]">
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Quick Transfer</h1>
          <section className="card max-lg:w-full lg:w-[445px] h-[276px]"></section>
        </section>
        <section className="w-full max-w-[635px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Debit & Credit Overview</h1>
          <section className="card w-full h-[276px]"></section>
        </section>
      </section>
    </>
  );
}