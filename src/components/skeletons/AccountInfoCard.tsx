import React, {ReactElement} from "react";

export function AccountInfoCardSkeleton(): ReactElement {
  return (
    <div className="bg-white border border-[#DFEAF2] rounded-[25px] h-[120px] flex gap-[10px] p-[20px] items-center">
      <div className="bg-slate-200 rounded-full col-span-2 min-w-[70px] w-[70px] h-[70px]"></div>
      <article className="flex flex-col gap-[5px] min-w-[200px] w-full max-w-[200px]">
        <p className="bg-slate-200 rounded col-span-2 h-[16px]"></p>
        <p className="bg-slate-200 rounded col-span-1 h-[25px]"></p>
      </article>
    </div>
  );
}
