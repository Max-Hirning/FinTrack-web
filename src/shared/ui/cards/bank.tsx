import { Cpu } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "shared/ui";
import { ICardResponse } from "src/shared/types";

interface IProps extends ICardResponse {}

export function BankCard({title, balance, currency, id}: IProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-full max-w-[350px] min-w-[350px] h-[235px] justify-between flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <article>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <CardTitle className="text-lg font-semibold">**{id.slice(-4)}</CardTitle>
            </article>
            <Cpu />
          </CardHeader>
          <CardFooter className="flex-col items-start">
            <CardTitle className="font-normal text-base">Balance</CardTitle>
            <CardDescription className="font-semibold text-2xl">{currency} {balance.toFixed(2)}</CardDescription>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}