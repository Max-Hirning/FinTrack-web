"use client";

import { Transaction } from "shared/ui";
import { LoaderCircle } from "lucide-react";
import { useGetTransactions } from "shared/hooks";

interface IProps {
  userId: string;
}

export function TransactionsList({userId}: IProps) {
  const {data: transactions, isLoading} = useGetTransactions({
    loanIds: [],
    goalIds: [],
    cardIds: [],
    budgetIds: [],
    currencies: [],
    userIds: [userId],
    transactionIds: [],
  });

  if(isLoading) {
    return (
      <section className="flex flex-col gap-[10px] justify-center items-center h-[-webkit-fill-available] pr-[10px] overflow-auto">
        <LoaderCircle className="animate-spin" />
      </section>
    )
  }

  if((transactions?.data || []).length === 0) {
    return (
      <section className="flex flex-col gap-[10px] justify-center items-center h-[-webkit-fill-available] pr-[10px] overflow-auto">
        <p className="text-destructive font-bold text-lg">No Data</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-[10px] h-[-webkit-fill-available] pr-[10px] overflow-auto">
      {
        (transactions?.data || []).map((el) => {
          return (
            <Transaction key={el.id} {...el}/>
          )
        })
      }
    </section>
  )
}