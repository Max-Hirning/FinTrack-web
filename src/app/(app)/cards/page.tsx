import { CardsListWidget, ExpensesStatisticsByCards } from "widgets/index"

export default function Page() {
  return (
    <>
      <section className="flex max-md:flex-col w-full gap-[25px] mt-[25px]">
        <ExpensesStatisticsByCards styles="max-md:w-full md:w-[350px]"/>
        <CardsListWidget styles="max-md:w-full md:w-[calc(100%-350px-25px)]"/>
      </section>
    </>
  )
}
