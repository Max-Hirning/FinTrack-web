"use client";

import { BankCard } from "shared/ui";
import { useGetCards } from "shared/hooks";
import { LoaderCircle } from "lucide-react";

interface IProps {
  userId: string;
}

export function CardsList({userId}: IProps) {
  const {data: cards, isLoading} = useGetCards({
    cardIds: [],
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

  if((cards?.data || []).length === 0) {
    return (
      <section className="flex justify-center items-center h-[260px] gap-[25px] pb-[5px] px-[5px] overflow-auto">
        <p className="text-destructive font-bold text-lg">No Data</p>
      </section>
    )
  }

  return (
    <section className="flex gap-[25px] pb-[5px] h-[260px] px-[5px] overflow-auto">
      {
        (cards?.data || []).map((el) => {
          return (
            <BankCard key={el.id} {...el}/>
          )
        })
      }
    </section>
  )
}