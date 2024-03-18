import Link from "next/link";
import {Metadata} from "next";
import React, {Suspense} from "react";
import {CardsListWrapper} from "@/modules/cards";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {TransactionFormWrapper, TransactionsTableWrapper} from "@/modules/transactions";

export const metadata: Metadata = {
  description: "Overview you transactions"
};

export default function Transactions() {
  return (
    <>
      <section className="max-lg:flex-col flex gap-[25px]">
        <section className="max-lg:w-full lg:min-w-[350px] w-fit">
          <article className="flex items-end justify-between mb-[10px]">
            <h1 className="title font-semibold text-[22px] text-text">My Cards</h1>
            <Link 
              href="/cards#title"
              aria-label="Card form"
              className="title font-semibold text-[17px] text-text mb-[2px] ml-[10px]"
            >+ Add Card</Link>
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
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">My Expense</h1>
          <section className="card max-lg:w-full lg:w-[350px] h-[235px]"></section>
        </section>
      </section>
      <section className="w-full w-max-[1110px] mt-[25px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Recent Transactions</h1>
        <Suspense fallback={<section className="bg-slate-200 card border h-[397px] p-[2px] animate-pulse"></section>}>
          <section className="card pb-[20px] px-[20px] h-[397px] overflow-auto">
            <TransactionsTableWrapper/>
          </section>
        </Suspense>
      </section>
      <section className="mt-[25px] max-w-[730px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Transaction Form</h1>
        <section className="card p-[20px] w-full relative">
          <TransactionFormWrapper/>
        </section>
      </section>
    </>
  );
}