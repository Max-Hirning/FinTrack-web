"use client";

import { LoaderCircle } from "lucide-react";
import { useGetTransactions, useGetTransactionsInfiniteScroll } from "shared/hooks";
import { InfiniteScroll, Transaction } from "shared/ui";

interface IProps {
  userId: string;
}

export function TransactionsList({userId}: IProps) {
  const {data: transactions, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading} = useGetTransactionsInfiniteScroll({
    loanIds: [],
    goalIds: [],
    cardIds: [],
    budgetIds: [],
    currencies: [],
    userIds: [userId],
    transactionIds: [],
  });

  const data = transactions?.pages.map((el) => el.data).flat(1) || [];

  if(isLoading) {
    return (
      <section className="flex flex-col gap-[10px] justify-center items-center h-[-webkit-fill-available] pr-[10px] overflow-auto">
        <LoaderCircle className="animate-spin" />
      </section>
    )
  }

  if(data.length === 0) {
    return (
      <section className="flex flex-col gap-[10px] justify-center items-center h-[-webkit-fill-available] pr-[10px] overflow-auto">
        <p className="text-destructive font-bold text-lg">No Data</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-[10px] h-[-webkit-fill-available] pr-[10px] overflow-auto">
      {
        (data).map((el) => {
          return (
            <Transaction key={el.id} {...el}/>
          )
        })
      }
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      >
        {hasNextPage && (
          <LoaderCircle
            size={32}
            className="min-h-[32px] m-auto animate-spin my-6"
          />
        )}
      </InfiniteScroll>
    </section>
  )
}