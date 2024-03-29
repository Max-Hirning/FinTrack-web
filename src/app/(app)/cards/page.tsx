import {Metadata} from "next";
import React, {Suspense, ReactElement} from "react";
import {currencyAPI} from "@/controllers/api/currency";
import {CardForm, CardsListWrapper} from "@/modules/cards";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {BankCardLineSkeleton} from "@/components/skeletons/BankCardLine";

export const metadata: Metadata = {
  description: "Overview you cards"
};

export default async function Page(): Promise<ReactElement> {
  const currencies = await currencyAPI.getAll();
  // const session = await getServerSession(authOptions);

  // const cardsExpensesFilters: ICardsExpensesFilters = {
  //   currency: (session?.user as IUserSession).currency,
  //   filters: {cards: (session?.user as IUserSession).cards, date: getCurrentMonthRange()}
  // };

  return (
    <>
      <section className="w-full max-w-fit">
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
      <section className="max-lg:flex-col flex gap-[25px] mt-[25px]">
        {/* <section className="w-full max-w-[350px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Card Expense Statistics</h1>
          <Suspense fallback={<section className="bg-slate-200 card border w-full h-[350px] p-[25px] animate-pulse"></section>}>
            <section className="card w-full h-[350px] flex items-center justify-center p-[25px]">
              <CardExpenseStatistics
                filters={cardsExpensesFilters}
                session={session?.user as IUserSession}
              />
            </section>
          </Suspense>
        </section> */}
        <section className="max-w-fit max-lg:w-full lg:w-[calc(100%-375px)]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Card List</h1>
          <section className="flex flex-col h-[350px] gap-[25px] pb-[5px] pr-[5px] overflow-auto">
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
      <section className="mt-[25px] max-w-[730px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Card Form</h1>
        <section className="card p-[20px] w-full relative">
          <p className="font-normal text-[16px] text-secondary">Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.</p>
          <CardForm currencies={currencies.data || []}/>
        </section>
      </section>
    </>
  );
}