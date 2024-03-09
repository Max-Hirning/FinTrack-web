import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <section className="flex gap-[25px]">
        <section className="min-w-[350px] w-fit">
          <article className="flex items-end justify-between mb-[10px]">
            <h1 className="title font-semibold text-[22px] text-text">My Cards</h1>
            <Link 
              href="/cards"
              className="title font-semibold text-[17px] text-text mb-[2px] ml-[10px]"
            >See All</Link>
          </article>
          <section className="flex gap-[25px] pb-[5px] overflow-auto">
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
          </section>
        </section>
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Recent Transaction</h1>
          <section className="card w-[350px] h-[235px]"></section>
        </section>
      </section>
      <section className="flex gap-[25px] mt-[25px]">
        <section className="w-full max-w-[730px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Weekly Activity</h1>
          <section className="card w-full h-[322px]"></section>
        </section>
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Expense Statistics</h1>
          <section className="card w-[350px] h-[322px]"></section>
        </section>
      </section>
      <section className="flex gap-[25px] mt-[25px]">
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Quick Transfer</h1>
          <section className="card w-[445px] h-[276px]"></section>
        </section>
        <section className="w-full max-w-[635px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Debit & Credit Overview</h1>
          <section className="card w-full h-[276px]"></section>
        </section>
      </section>
    </>
  );
}