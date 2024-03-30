"use client";

import {ButtonUI} from "@/UI/ButtonUI";
import React, {ReactElement} from "react";
import {useRouter} from "next/navigation";

interface IProps {
  reset: () => void;
  error: Error & { digest?: string };
}

export default function Error({reset}: IProps): ReactElement {
  const {push} = useRouter();

  return (
    <main className="p-[20px] flex flex-col items-center justify-center gap-[50px] h-full w-full">
      <article className="flex flex-col items-center justify-center gap-[10px]">
        <h1 className="title text-text text-[28px] font-semibold">Ooops</h1>
        <h2 className="title text-text text-[24px] font-medium">Something went wrong!</h2>
      </article>
      <div className="flex justify-between items-center gap-[10px] w-full max-w-[325px]">
        <ButtonUI
          variant="contained"
          onClick={() => reset()}
          styles="w-[100px] h-[40px] rounded-[9px]"
        >Try again</ButtonUI>
        <ButtonUI
          variant="contained"
          onClick={() => push("/")}
          styles="w-[150px] h-[40px] rounded-[9px]"
        >Go on main page</ButtonUI>
      </div>
    </main>
  );
}