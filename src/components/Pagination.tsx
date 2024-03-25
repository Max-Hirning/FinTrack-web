import React from "react";
import {ButtonUI} from "@/UI/ButtonUI";

interface IProps {
  page: number;
  count: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export function Pagination({page, count, disabled, onChange}: IProps) {
  return (
    <div className="float-right flex gap-x-[10px] mt-[15px]">
      <ButtonUI
        variant="text"
        title="Previous pages"
        onClick={() => onChange(page-3)}
        disabled={disabled || (page-4) < 1}
        styles="rounded-[10px] px-[15px] h-[40px] flex items-center justify-center"
      >Previous</ButtonUI>
      <ButtonUI
        variant="text"
        disabled={disabled}
        title={`Page ${page-2}`}
        onClick={() => onChange(page-2)}
        styles={`${(page-2 <= 0) && "hidden"} rounded-[10px] px-[15px] w-[40px] h-[40px] flex items-center justify-center`}
      >{page-2}</ButtonUI>
      <ButtonUI
        variant="text"
        disabled={disabled}
        title={`Page ${page-1}`}
        onClick={() => onChange(page-1)}
        styles={`${(page-1 <= 0) && "hidden"} rounded-[10px] px-[15px] w-[40px] h-[40px] flex items-center justify-center`}
      >{page-1}</ButtonUI>
      <ButtonUI
        variant="contained"
        disabled={disabled}
        title={`Page ${page}`}
        styles="rounded-[10px] px-[15px] w-[40px] h-[40px] flex items-center justify-center"
      >{page}</ButtonUI>
      <ButtonUI
        variant="text"
        disabled={disabled}
        title={`Page ${page+1}`}
        onClick={() => onChange(page+1)}
        styles={`${(page+1 > count) && "hidden"} rounded-[10px] px-[15px] w-[40px] h-[40px] flex items-center justify-center`}
      >{page+1}</ButtonUI>
      <ButtonUI
        variant="text"
        title="Next pages"
        onClick={() => onChange(page+2)}
        disabled={disabled || (page+4) > count}
        styles="rounded-[10px] px-[15px] h-[40px] flex items-center justify-center"
      >Next</ButtonUI>
    </div>
  );
}