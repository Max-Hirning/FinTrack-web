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
      ><></></AccountCard>
      <AccountCard
        title="Income"
        description="USD 5600.02"
      ><></></AccountCard>
      <AccountCard
        title="Expense"
        description="USD 12750.02"
      ><></></AccountCard>
      <AccountCard
        title="Cashflow"
        description="USD 7920.02"
      ><></></AccountCard>
    </section>
  )
}