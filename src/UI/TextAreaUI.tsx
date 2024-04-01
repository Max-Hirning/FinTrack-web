import WarningIcon from "@/UI/icons/warn";
import React, {ReactElement, TextareaHTMLAttributes} from "react";

interface IProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  id: string;
  label: string;
  value: string;
  error?: boolean;
  styles?: string;
  errorMsg?: string;
  changeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextAreaUI({id, styles, label, value, error, errorMsg, changeText, ...props}: IProps): ReactElement {
  return (
    <fieldset className={styles || ""}>
      <label
        htmlFor={id}
        className="text-[#232323] text-[16px] font-normal"
      >{label} <span className={`${!props.required && "hidden"} text-danger`}>*</span></label>
      <textarea
        id={id}
        {...props}
        value={value}
        onChange={changeText}
        className="focus:outline-none shadow-sm focus:border-[#DFEAF2] focus:ring-1 focus:ring-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] text-[#718EBF] min-h-[50px] border border-[#DFEAF2] w-full p-[15px]"
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
