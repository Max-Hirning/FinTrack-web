import React from "react";

export function BankCardLineSkeleton() {
  return (
    <div className="bg-white border animate-pulse border-[#DFEAF2] rounded-[25px] items-center w-fit min-w-[700px] h-[90px] p-[20px] flex justify-between relative">
      <div className="bg-slate-200 col-span-2 rounded-[20px] w-[60px] h-[60px] flex items-center justify-center"></div>
      <article className="flex flex-col w-[100px] gap-[5px]">
        <p className="bg-slate-200 rounded col-span-2 h-[16px]"></p>
        <p className="bg-slate-200 rounded col-span-1 h-[15px]"></p>
      </article>
      <article className="flex flex-col w-[150px] gap-[5px]">
        <p className="bg-slate-200 rounded col-span-2 h-[16px]"></p>
        <p className="bg-slate-200 rounded col-span-1 h-[15px]"></p>
      </article>
      <article className="flex flex-col w-[100px] gap-[5px]">
        <p className="bg-slate-200 rounded col-span-2 h-[16px]"></p>
        <p className="bg-slate-200 rounded col-span-1 h-[15px]"></p>
      </article>
      <button className="bg-slate-200 rounded-[15px] col-span-2 w-[120px] h-[40px]"></button>
    </div>
  );
}
