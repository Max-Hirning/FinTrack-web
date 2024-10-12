import { BudgetWidget, CardsListWidget, CardWidget, ExpensesStatisticsByCards, GoalCardsListWidget, LoanCardsListWidget } from "widgets/index"

export default function Page() {
  return (
    <>
      <section className="flex max-md:flex-col w-full gap-[25px]">
        <ExpensesStatisticsByCards styles="max-md:w-full md:w-[350px]"/>
        <CardsListWidget styles="max-md:w-full md:w-[calc(100%-350px-25px)]"/>
      </section>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <LoanCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
        <GoalCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
      </section>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <CardWidget/>
        <BudgetWidget/>
      </section>
    </>
  )
}
