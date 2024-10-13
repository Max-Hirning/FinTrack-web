"use client";

import { BankCard } from "shared/ui";
import { useGetCards } from "shared/hooks";

interface IProps {
  userId: string;
}

export function CardsList({userId}: IProps) {
  const {data: cards} = useGetCards({
    cardIds: [],
    currencies: [],
    userIds: [userId],
  });

  return (
    <section className="flex gap-[25px] pb-[5px] px-[5px] overflow-auto">
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