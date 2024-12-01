"use client"

import Link from "next/link";
import { WalletMinimal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDeleteBudget } from "src/shared/hooks";
import { IBudgetResponse } from "src/shared/types";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "shared/ui"

interface IProps extends IBudgetResponse {}

export function BudgetCard({id, amount, balance, title, period, currency}: IProps) {
  const searchParams = useSearchParams();
  const percentage = (amount / balance) * 100;
  const {mutate: deleteBudget} = useDeleteBudget();
  const width = percentage >= 100 ? 100 : percentage;

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Card className="p-[24px] w-full max-w-[350px] min-w-[350px] h-[235px] justify-between flex flex-col">
            <CardHeader className="p-0 flex flex-col gap-[15px]">
              <article className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <WalletMinimal />
              </article>
              <CardTitle className="font-normal text-base">Period: {period}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-[10px]">
              <CardDescription className="font-normal text-base self-end">{currency.toUpperCase()} {amount.toFixed(2)}/{balance.toFixed(2)}</CardDescription>
              <div className="relative w-full h-[8px]">
                <div className="absolute z-10 w-full h-[8px] bg-gray-300"/>
                <div 
                  style={{
                    width: `${width}%`,
                  }}
                  className={`absolute z-20 h-[8px] ${(amount / balance < 1) ? "bg-green-500" : "bg-red-500"}`} 
                  />
              </div>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <Link href={{
            pathname: "/budgets",
            query: {
              ...Object.fromEntries(searchParams.entries()),
              budgetId: id
            }
          }}>
            <ContextMenuItem>Edit</ContextMenuItem>
          </Link>
          <ContextMenuItem>
            <DialogTrigger>Delete</DialogTrigger>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>This action cannot be undone. This will permanently delete your budget from our servers.</DialogDescription>
        <div className='gap-[20px] flex items-center'>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button 
              onClick={() => deleteBudget(id)} 
              variant="destructive"
            >Delete</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
