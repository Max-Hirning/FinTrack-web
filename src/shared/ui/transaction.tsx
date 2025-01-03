"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useDeleteTransaction } from "shared/hooks";
import { ITransactionResponse } from "shared/types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "shared/ui";
import Image from "next/image";
import { hexToRgba } from "../lib/color";
import axios from "axios";

interface IProps extends ITransactionResponse {}

export function Transaction({description, date, amount, id, card, category}: IProps) {
  const searchParams = useSearchParams();
  const {mutate: deleteTransaction} = useDeleteTransaction();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex gap-[10px] items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full" style={{backgroundColor: hexToRgba(category.color, 0.75)}}>
              <Image
                width={28}
                height={28}
                alt={category.title}
                src={category.image}
              />
            </div>
            <article>
              <p className="text-base">{description}</p>
              <p className="text-sm text-gray-400">{format(new Date(date), 'd MMMM yyyy')}</p>
            </article>
          </div>
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
