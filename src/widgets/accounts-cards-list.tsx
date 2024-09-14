import { Coins, HandCoins, Landmark, SquareArrowDown, SquareArrowUp } from "lucide-react";
import { AccountCard } from "shared/ui";

interface IProps {
  styles?: string;
}

export function AccountsCardsListWidget({styles}: IProps) {
  return (
    <section className={`flex gap-[25px] pb-[5px] overflow-auto max-w-fit ${styles || ""}`}>
      <AccountCard
        title="My Balance"
        description="USD 12750.02"
        circleBackgroundColor="bg-green-50"
      ><Landmark className="text-green-500" /></AccountCard>
      <AccountCard
        title="Income"
        description="USD 5600.02"
        circleBackgroundColor="bg-green-50"
      ><SquareArrowDown className="text-green-500" /></AccountCard>
      <AccountCard
        title="Expense"
        description="USD 12750.02"
        circleBackgroundColor="bg-red-50"
      ><SquareArrowUp className="text-red-500" /></AccountCard>
      <AccountCard
        title="My debt"
        description="USD 7920.02"
        circleBackgroundColor="bg-red-50"
      ><HandCoins className="text-red-500" /></AccountCard>
      <AccountCard
        title="Cashflow"
        description="USD 7920.02"
        circleBackgroundColor="bg-yellow-50"
      ><Coins className="text-yellow-500" /></AccountCard>
    </section>
  )
}