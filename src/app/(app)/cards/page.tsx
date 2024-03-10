import React, {Suspense} from "react";
import {CardsListWrapper} from "@/modules/cards";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {BankCardLineSkeleton} from "@/components/skeletons/BankCardLine";

export default function Cards() {
  return (
    <>
      <section className="min-w-[350px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">My Cards</h1>
        <section className="flex gap-[25px] pb-[5px] px-[5px] overflow-auto max-w-fit">
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
      <section className="flex gap-[25px] mt-[25px]">
        <section className="w-[350px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Card Expense Statistics</h1>
          <section className="card w-full h-[310px]"></section>
        </section>
        <section className="max-w-fit w-[calc(100%-375px)]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Card List</h1>
          <section className="flex flex-col h-[310px] gap-[25px] pb-[5px] pr-[5px] overflow-auto">
            <Suspense fallback={
              <>
                <BankCardLineSkeleton/>
                <BankCardLineSkeleton/>
                <BankCardLineSkeleton/>
                <BankCardLineSkeleton/>
              </>
            }>
              <CardsListWrapper elStyle="line"/>
            </Suspense>
          </section>
        </section>
      </section>
      <section className="mt-[25px] w-[730px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Add New Card</h1>
        <section className="card w-full h-[440px]"></section>
      </section>
    </>
  );
}