import Link from "next/link";
import React, {Suspense} from "react";
import {CardsListWrapper} from "@/modules/cards";
import {AccountsWrappers} from "@/modules/analytics";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {AccountInfoCardSkeleton} from "@/components/skeletons/AccountInfoCard";

export default function Accounts() {
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
          <AccountsWrappers/>
        </Suspense>
      </section>
      <section className="max-lg:flex-col mt-[25px] flex gap-[25px]">
        <section className="w-full">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Last Transaction</h1>
          <section className="card h-[235px]"></section>
        </section>
        <section className="max-lg:w-full lg:w-[350px]">
          <article className="flex items-end justify-between mb-[10px]">
            <h1 className="title font-semibold text-[22px] text-text">My Cards</h1>
            <Link 
              href="/cards"
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
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Balance History</h1>
        <section className="card w-full h-[364px]"></section>
      </section>
    </>
  );
}