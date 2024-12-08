"use client";

import Link from "next/link";
import { format } from "date-fns";
import { CircleCheckBig, HandCoins } from "lucide-react"
import { useDeleteLoan } from "shared/hooks";
import { ILoanResponse } from "shared/types";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, DialogTitle, DialogTrigger, Button, DialogClose, DialogContent, DialogDescription } from "shared/ui"
import { cardWarnStyle } from "shared/lib";

interface IProps extends ILoanResponse {}

export function LoanCard({amount, id, title, deadline, date, balance, description, status, currency}: IProps) {
  const searchParams = useSearchParams();
  const percentage = (amount / balance) * 100;
  const {mutate: deleteLoan} = useDeleteLoan();
  const width = percentage >= 100 ? 100 : percentage;

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Card className={`p-[24px] w-full max-w-[350px] min-w-[350px] h-[235px] justify-between flex flex-col ${!(balance / amount >= 1) && cardWarnStyle(deadline)}`}>
            <CardHeader className="p-0 flex flex-col gap-[15px]">
              <article className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                {(status === "open") && <HandCoins />}
                {(status === "closed") && <CircleCheckBig />}
              </article>
              <article className="flex flex-col">
                <CardTitle className="font-normal text-base">{description}</CardTitle>
                <CardTitle className="font-normal text-base">{format(new Date(date), 'dd MMM yyyy')} - {format(new Date(deadline), 'dd MMM yyyy')}</CardTitle>
              </article>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-[10px]">
              <CardDescription className="font-normal text-base self-end">{currency.toUpperCase()} {balance.toFixed(2)}/{amount.toFixed(2)}</CardDescription>
              <div className="relative w-full h-[8px]">
                <div className="absolute z-10 w-full h-[8px] bg-gray-300"/>
                <div 
                  style={{
                    width: `${width}%`,
                  }}
                  className={`absolute z-20 h-[8px] ${(balance / amount >= 1) ? "bg-green-500" : "bg-red-500"}`} 
                />
              </div>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <Link href={{
            pathname: "/loans",
            query: {
              ...Object.fromEntries(searchParams.entries()),
              loanId: id
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
        <DialogDescription>This action cannot be undone. This will permanently delete your loan from our servers.</DialogDescription>
        <div className='gap-[20px] flex items-center'>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button 
              onClick={() => deleteLoan(id)} 
              variant="destructive"
            >Delete</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
