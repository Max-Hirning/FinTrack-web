"use client";

import { LoanCard } from "shared/ui";
import { LoaderCircle } from "lucide-react";
import { useGetLoans } from "src/shared/hooks";

interface IProps {
  userId: string;
}

export function LoanCardsList({userId}: IProps) {
  const {data: loans, isLoading} = useGetLoans({
    loanIds: [],
    currencies: [],
    userIds: [userId],
  });

  if(isLoading) {
    return (
      <section className="flex justify-center items-center h-[260px] gap-[25px] pb-[5px] px-[5px] overflow-auto">
        <LoaderCircle className="animate-spin" />
      </section>
    )
  }

  if((loans?.data || []).length === 0) {
    return (
      <section className="flex justify-center items-center h-[260px] gap-[25px] pb-[5px] px-[5px] overflow-auto">
        <p className="text-destructive font-bold text-lg">No Data</p>
      </section>
    )
  }

  return (
    <section className="flex gap-[25px] h-[260px] pb-[5px] px-[5px] overflow-auto">
      {
        (loans?.data || []).map((el) => {
          return (
            <LoanCard key={el.id} {...el}/>
          )
        })
      }
    </section>
  )
}