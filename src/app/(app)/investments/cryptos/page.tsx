import {Metadata} from "next";
import React, {ReactElement, Suspense} from "react";
import {PortfolioForm, PortfoliosListWrapper} from "@/modules/cards";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {PortfolioAssetsStatisticsWrapper} from "@/modules/analytics";

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
              <PortfolioAssetsStatisticsWrapper/>
            </section>
          </Suspense>
        </section>
        <section className="w-full max-w-[350px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">My budget</h1>
          <Suspense fallback={<section className="bg-slate-200 card border w-full h-[350px] p-[25px] animate-pulse"></section>}>
            <section className="card w-full h-[350px] flex items-center justify-center p-[25px]">
              {/* <CardsExpensesStatisticsWrapper/> */}
            </section>
          </Suspense>
        </section>
      </section>
      <section className="mt-[25px] max-w-[730px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Portfolio Form</h1>
        <section className="card p-[20px] w-full relative">
          <p className="font-normal text-[16px] text-secondary">Portfolio generally means a account, with your assetst.</p>
          <PortfolioForm/>
        </section>
      </section>
    </>
  );
}