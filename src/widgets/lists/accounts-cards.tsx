"use client";

import { AccountCard } from "shared/ui";
import { useGetAccount, useGetUser } from "shared/hooks";
import { Coins, HandCoins, Landmark, SquareArrowDown, SquareArrowUp } from "lucide-react";

interface IProps {
  userId: string;
  styles?: string;
}

export function AccountsCardsListWidget({userId, styles}: IProps) {
  const {data: user} = useGetUser(userId);
  const {data: accountStatistics} = useGetAccount(userId);

  return (
    <section className={`flex gap-[25px] pb-[5px] overflow-auto max-w-fit ${styles || ""}`}>
      {
        (accountStatistics && user) &&
        <>
          <AccountCard
            title="My Balance"
            circleBackgroundColor="bg-green-50"
            description={`${user.currency} ${accountStatistics.budget.toFixed(2)}`}
          ><Landmark className="text-green-500" /></AccountCard>
          <AccountCard
            title="Income"
            circleBackgroundColor="bg-green-50"
            description={`${user.currency} ${accountStatistics.incomes.toFixed(2)}`}
          ><SquareArrowDown className="text-green-500" /></AccountCard>
          <AccountCard
            title="Expense"
            circleBackgroundColor="bg-red-50"
            description={`${user.currency} ${accountStatistics.expenses.toFixed(2)}`}
          ><SquareArrowUp className="text-red-500" /></AccountCard>
          <AccountCard
            title="My debt"
            circleBackgroundColor="bg-red-50"
            description={`${user.currency} ${accountStatistics.loans.toFixed(2)}`}
          ><HandCoins className="text-red-500" /></AccountCard>
          <AccountCard
            title="Cashflow"
            circleBackgroundColor="bg-yellow-50"
            description={`${user.currency} ${accountStatistics.cashflow.toFixed(2)}`}
          ><Coins className="text-yellow-500" /></AccountCard>
        </>
      }
    </section>
  )
}