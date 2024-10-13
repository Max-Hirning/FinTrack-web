"use client";

import { BudgetCard } from "shared/ui";
import { LoaderCircle } from "lucide-react";
import { useGetBudgets } from "src/shared/hooks";

interface IProps {
  userId: string;
}

export function BudgetCardsList({userId}: IProps) {
  const {data: budgets, isLoading} = useGetBudgets({
    budgetIds: [],
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

  if((budgets?.data || []).length === 0) {
    return (
      <section className="flex justify-center items-center h-[260px] gap-[25px] pb-[5px] px-[5px] overflow-auto">
        <p className="text-destructive font-bold text-lg">No Data</p>
      </section>
    )
  }

  return (
    <section className="flex gap-[25px] h-[260px] pb-[5px] px-[5px] overflow-auto">
      {
        (budgets?.data || []).map((el) => {
          return (
            <BudgetCard key={el.id} {...el}/>
          )
        })
      }
      {/* <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/>
      <BudgetCard/> */}
    </section>
  )
}