import React from "react";

export function BankCardSkeleton() {
  return (
    <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px] p-[20px] animate-pulse flex flex-col justify-between relative">
      <article className="flex flex-col w-[50%] gap-[5px]">
        <p className="bg-slate-200 rounded col-span-2 h-[12px]"></p>
        <p className="bg-slate-200 rounded col-span-1 h-[20px]"></p>
      </article>
      <article className="flex items-center justify-between">
        <article className="flex flex-col w-[45%] gap-[5px]">
          <p className="bg-slate-200 rounded col-span-2 h-[12px]"></p>
          <p className="bg-slate-200 rounded col-span-1 h-[20px]"></p>
        </article>
        <article className="flex flex-col w-[45%] gap-[5px]">
          <p className="bg-slate-200 rounded col-span-2 h-[12px]"></p>
          <p className="bg-slate-200 rounded col-span-1 h-[20px]"></p>
        </article>
      </article>
      <hr className="absolute bottom-[60px] left-0 w-full"/>
      <p className="bg-slate-200 rounded col-span-1 h-[16px]"></p>
    </div>
  );
}
