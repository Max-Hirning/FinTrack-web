import Link from "next/link";
import { Cpu } from "lucide-react";
import { useDeleteCard } from "shared/hooks";
import { ICardResponse } from "shared/types";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "shared/ui";
import { hexToRgba } from "src/shared/lib/color";

interface IProps extends ICardResponse {}

export function BankCard({title, balance, currency, id, color}: IProps) {
  const {mutate: deleteCard} = useDeleteCard();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-full max-w-[350px] min-w-[350px] h-[235px] justify-between flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <article>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <CardTitle className="text-lg font-semibold">**{id.slice(-4)}</CardTitle>
            </article>
            <div style={{backgroundColor: hexToRgba(color, 0.25)}} className="rounded-[8px] p-[6px]">
              <Cpu style={{color: color}} />
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start">
            <CardTitle className="font-normal text-base">Balance</CardTitle>
            <CardDescription className="font-semibold text-2xl">{currency} {balance.toFixed(2)}</CardDescription>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Link href={`/cards?cardId=${id}`}>
          <ContextMenuItem>Edit</ContextMenuItem>
        </Link>
        <ContextMenuItem onClick={() => deleteCard(id)}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}