"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useDeleteTransaction } from "shared/hooks";
import { ITransactionResponse } from "shared/types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "shared/ui";

interface IProps extends ITransactionResponse {}

export function Transaction({description, date, amount, id, card}: IProps) {
  const searchParams = useSearchParams();
  const {mutate: deleteTransaction} = useDeleteTransaction();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex gap-[10px] items-center justify-between">
          <div className="bg-[#FFF5D9] w-[55px] h-[55px] rounded-full"></div>
          <article>
            <p className="text-base">{description}</p>
            <p className="text-sm text-gray-400">{format(new Date(date), 'd MMMM yyyy')}</p>
          </article>
          <p className={`text-base ${amount < 0 ? "text-red-500" : "text-green-500"}`}>{card.currency} {amount}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Link href={{
          pathname: "/",
          query: {
            ...Object.fromEntries(searchParams.entries()),
            transactionId: id
          }
        }}>
          <ContextMenuItem>Edit</ContextMenuItem>
        </Link>
        <ContextMenuItem onClick={() => deleteTransaction(id)}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
