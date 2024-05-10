import {Metadata} from "next";
import React, {ReactElement, Suspense} from "react";
import {PortfoliosListWrapper} from "@/modules/cards";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";

export const metadata: Metadata = {
  title: "Crypto investments",
  description: "Overview your crypto investments"
};

export default function Page(): ReactElement {
  return (
    <>
      <section className="flex gap-[25px] pb-[5px] px-[5px] overflow-auto max-w-fit">
        <Suspense fallback={
          <>
            <BankCardSkeleton/>
            <BankCardSkeleton/>
            <BankCardSkeleton/>
            <BankCardSkeleton/>
          </>
        }>
          <PortfoliosListWrapper/>
        </Suspense>
      </section>
      <section className="mt-[25px] flex gap-[25px] flex-wrap">
        <section className="w-full max-w-[350px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">All assets</h1>
          <Suspense fallback={<section className="bg-slate-200 card border w-full h-[350px] p-[25px] animate-pulse"></section>}>
            <section className="card w-full h-[350px] flex items-center justify-center p-[25px]">
              {/* <CardsExpensesStatisticsWrapper/> */}
            </section>
          </Suspense>
        </section>
        <section className="w-full max-w-[350px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]"><span className="font-black">My portfolio 2</span> assets</h1>
          <Suspense fallback={<section className="bg-slate-200 card border w-full h-[350px] p-[25px] animate-pulse"></section>}>
            <section className="card w-full h-[350px] flex items-center justify-center p-[25px]">
              {/* <CardsExpensesStatisticsWrapper/> */}
            </section>
          </Suspense>
        </section>
      </section>
    </>
  );
}