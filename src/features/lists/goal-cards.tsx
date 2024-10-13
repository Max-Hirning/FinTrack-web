"use client";

import { GoalCard } from "shared/ui";
import { useGetGoals } from "shared/hooks";
import { LoaderCircle } from "lucide-react";

interface IProps {
  userId: string;
}

export function GoalCardsList({userId}: IProps) {
  const {data: goals, isLoading} = useGetGoals({
    goalIds: [],
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

  if((goals?.data || []).length === 0) {
    return (
      <section className="flex justify-center items-center h-[260px] gap-[25px] pb-[5px] px-[5px] overflow-auto">
        <p className="text-destructive font-bold text-lg">No Data</p>
      </section>
    )
  }

  return (
    <section className="flex gap-[25px] h-[260px] pb-[5px] px-[5px] overflow-auto">
      {
        (goals?.data || []).map((el) => {
          return (
            <GoalCard key={el.id} {...el}/>
          )
        })
      }
    </section>
  )
}