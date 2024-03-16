import React, {FocusEvent} from "react";
import WarningIcon from "@/UI/icons/warning";

interface IProps {
  id: string;
  label: string;
  value: string;
  error?: boolean;
  styles?: string;
  errorMsg?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  changeText: (e: FocusEvent<HTMLInputElement>) => void;
  type: "text"|"datetime-local"|"password"|"number"|"email"|"date"|"time"|"search"|"tel"|"color";
}

export function InputUI({id, styles, label, value, disabled, error, errorMsg, required, placeholder, onBlur, changeText, type}: IProps) {
  return (
    <fieldset className={styles || ""}>
      <label 
        htmlFor={id}
        className="text-[#232323] text-[16px] font-normal"
      >{label} <span className={`${!required && "hidden"} text-danger`}>*</span></label>
      <input 
        id={id}
        type={type}
        value={value}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        onChange={changeText}
        placeholder={placeholder}
        className="focus:outline-none shadow-sm focus:border-[#DFEAF2] focus:ring-1 focus:ring-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] text-[#718EBF] h-[50px] border border-[#DFEAF2] w-full p-[15px]"
      />
      {
        (error) &&
        <article className="flex mt-[5px]">
          <WarningIcon width={15} height={15} color="#FF4B4A"/>
          <p className="text-danger ml-[10px] text-[12px]">{errorMsg}</p>
        </article>
      }
    </fieldset>
  );
}