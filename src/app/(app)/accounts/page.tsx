import Link from "next/link";
import React from "react";

export default function Accounts() {
  return (
    <>
      <section className="flex gap-[25px] pb-[5px] overflow-auto max-w-fit">
        <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[255px] h-[120px]"></div>
        <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[255px] h-[120px]"></div>
        <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[255px] h-[120px]"></div>
        <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[255px] h-[120px]"></div>
      </section>
      <section className="mt-[25px] flex gap-[25px]">
        <section className="w-full">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Last Transaction</h1>
          <section className="card h-[235px]"></section>
        </section>
        <section className="w-[350px]">
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
      </section>
      <section className="w-full max-w-[730px] mt-[25px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Balance History</h1>
        <section className="card w-full h-[364px]"></section>
      </section>
    </>
  );
}