import { CardsListWidget, BudgetCardsListWidget, AccountsCardsListWidget } from "widgets/index"

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
