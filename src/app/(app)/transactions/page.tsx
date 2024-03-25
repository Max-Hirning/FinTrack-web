import Link from "next/link";
import {Metadata} from "next";
import React, {Suspense} from "react";
import {getServerSession} from "next-auth";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {categoryAPI} from "@/controllers/api/category";
import {CardsList, ICardsFilters} from "@/modules/cards";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";
import {ITransactionsFilters, TransactionForm, TransactionsTable} from "@/modules/transactions";

export const metadata: Metadata = {
  description: "Overview you transactions"
};

export default async function Page() {
  const categories = await categoryAPI.getAll();
  const session = await getServerSession(authOptions);

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
              <CardsList 
                elStyle="card"
                filters={cardsFilters}
                session={session?.user as IUserSession}
              />
            </Suspense>
          </section>
        </section>
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">My Expense</h1>
          <section className="card max-lg:w-full lg:w-[350px] h-[235px]"></section>
        </section>
      </section>
      <section className="max-w-fit mt-[25px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Recent Transactions</h1>
        <Suspense fallback={<section className="bg-slate-200 card border h-[397px] p-[2px] animate-pulse"></section>}>
          <TransactionsTable 
            filters={transactionsFilters}
            session={session?.user as IUserSession}
          />
        </Suspense>
      </section>
      <section className="mt-[55px] max-w-[730px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Transaction Form</h1>
        <section className="card p-[20px] w-full relative">
          <TransactionForm
            filters={cardsFilters}
            categories={categories.data || []}
            session={session?.user as IUserSession}
          />
        </section>
      </section>
    </>
  );
}