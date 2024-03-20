import WarningIcon from "@/UI/icons/warning";
import React, {FocusEvent, InputHTMLAttributes, ReactNode} from "react";

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  id: string;
  label: string;
  value: string;
  listId: string;
  error?: boolean;
  styles?: string;
  errorMsg?: string;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
  placeholder?: string;
  inputStyles?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  changeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password" | "number" | "email" | "date" | "time" | "search" | "tel" | "color";
}

export function SelectUI({id, inputStyles, children, styles, listId, label, value, disabled, error, errorMsg, required, placeholder, onBlur, changeText, type, ...props}: IProps) {
  return (
    <fieldset className={styles || ""}>
      <label 
        htmlFor={id}
        className="text-[#232323] text-[16px] font-normal"
      >
        {label} 
        <span className={`${!required && "hidden"} text-danger`}>*</span>
      </label>
      <input
        id={id}
        {...props}
        type={type}
        value={value}
        list={listId}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        onChange={changeText}
        placeholder={placeholder}
        className={`${inputStyles || ""} focus:outline-none shadow-sm focus:border-[#DFEAF2] focus:ring-1 focus:ring-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] text-[#718EBF] h-[50px] border border-[#DFEAF2] w-full p-[15px]`}
      />
      {children}
      {error && (
        <article className="flex mt-[5px]">
          <WarningIcon width={15} height={15} color="#FF4B4A" />
          <p className="text-danger ml-[10px] text-[12px]">{errorMsg}</p>
        </article>
      )}
    </fieldset>
  );
}
