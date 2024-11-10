"use client"

import Link from "next/link";
import { Goal } from "lucide-react"
import { useDeleteGoal } from "src/shared/hooks";
import { IGoalResponse } from "src/shared/types";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "shared/ui"

interface IProps extends IGoalResponse {}

export function GoalCard({balance, amount, id, title, description, currency}: IProps) {
  const searchParams = useSearchParams();
  const percentage = (amount / balance) * 100;
  const {mutate: deleteGoal} = useDeleteGoal();
  const width = percentage >= 100 ? 100 : percentage;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-[24px] w-full max-w-[350px] min-w-[350px] h-[235px] justify-between flex flex-col">
          <CardHeader className="p-0 flex flex-col gap-[15px]">
            <article className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <Goal />
            </article>
            <CardTitle className="font-normal text-base">{description}</CardTitle>
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
          pathname: "/goals",
          query: {
            ...Object.fromEntries(searchParams.entries()),
            goalId: id
          }
        }}>
          <ContextMenuItem>Edit</ContextMenuItem>
        </Link>
        <ContextMenuItem onClick={() => deleteGoal(id)}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
