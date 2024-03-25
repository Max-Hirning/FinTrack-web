import React from "react";

interface IProps {
  shrinked?: boolean;
}

export function TransactionSkeleton({shrinked}: IProps) {
  return (
    <div className={`flex items-center ${!shrinked && "md:w-[630px]"} animate-pulse`}>
      <div className="mr-[10px] flex items-center w-[220px]">
        <div className="bg-slate-200 rounded-[20px] h-[55px] w-full max-w-[55px] col-span-2"></div>
        <article className="ml-[20px] w-full">
          <p className="bg-slate-200 mb-[5px] rounded h-[16px] col-span-2"></p>
          <p className="bg-slate-200 rounded h-[15px] col-span-1"></p>
        </article>
      </div>
      <article className={`mr-[10px] w-[125px] max-md:hidden ${shrinked && "hidden"}`}>
        <p className="bg-slate-200 mb-[5px]  rounded h-[16px] col-span-2"></p>
        <p className="bg-slate-200 rounded h-[15px] col-span-1"></p>
      </article>
      <p className={`bg-slate-200 mr-[10px] ${shrinked && "hidden"} rounded h-[16px] col-span-2 max-md:hidden w-[150px]`}></p>
      <p className="bg-slate-200 rounded h-[16px] w-[100px] col-span-2"></p>
    </div>
  );
}
