import { CardsListWidget } from "widgets/cards-list"
import { BudgetCardsListWidget } from "widgets/budget-cards-list"
import { AccountsCardsListWidget } from "widgets/accounts-cards-list"

export default function Page() {
  return (
    <>
      <AccountsCardsListWidget/>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <CardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
        <BudgetCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
      </section>
    </>
  )
}
