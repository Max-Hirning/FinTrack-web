import React from "react";

export default function Cards() {
  return (
    <>
      <section className="min-w-[350px]">
        <h1 className="title font-semibold text-[22px] text-text mb-[10px]">My Cards</h1>
        <section className="flex gap-[25px] pb-[5px] overflow-auto max-w-fit">
          <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
          <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
          <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
          <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px]"></div>
        </section>
      </section>
      <section className="flex gap-[25px] mt-[25px]">
        <section className="w-[350px]">
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Card Expense Statistics</h1>
          <section className="card w-full h-[310px]"></section>
        </section>
        <section>
          <h1 className="title font-semibold text-[22px] text-text mb-[10px]">Card List</h1>
          <section className="flex flex-col h-[310px] gap-[25px] pr-[5px] overflow-auto">
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-[730px] min-h-[90px]"></div>
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-[730px] min-h-[90px]"></div>
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-[730px] min-h-[90px]"></div>
            <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-[730px] min-h-[90px]"></div>
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