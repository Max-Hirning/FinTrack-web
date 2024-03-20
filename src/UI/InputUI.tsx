import WarningIcon from "@/UI/icons/warning";
import React, {InputHTMLAttributes} from "react";

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  id: string;
  label: string;
  value: string;
  error?: boolean;
  styles?: string;
  maxDate?: string;
  errorMsg?: string;
  changeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputUI({id, maxDate, styles, label, value, error, errorMsg, changeText, ...props}: IProps) {
  return (
    <fieldset className={styles || ""}>
      <label
        htmlFor={id}
        className="text-[#232323] text-[16px] font-normal"
      >{label} <span className={`${!props.required && "hidden"} text-danger`}>*</span></label>
      <input
        id={id}
        {...props}
        value={value}
        max={maxDate}
        onChange={changeText}
        className="focus:outline-none shadow-sm focus:border-[#DFEAF2] focus:ring-1 focus:ring-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] text-[#718EBF] h-[50px] border border-[#DFEAF2] w-full p-[15px]"
      />
      {error && (
        <article className="flex mt-[5px]">
          <WarningIcon width={15} height={15} color="#FF4B4A" />
          <p className="text-danger ml-[10px] text-[12px]">{errorMsg}</p>
        </article>
      )}
    </fieldset>
  );
}
