import { BudgetCardsListWidget, BudgetWidget, CardsListWidget, CardWidget, ExpensesStatisticsByCards } from "widgets/index"

interface IProps {
  searchParams: { 
    cardId?: string;
    budgetId?: string;
  }
}

export default function Page({searchParams}: IProps) {
  return (
    <>
      <section className="flex max-md:flex-col w-full gap-[25px]">
        <ExpensesStatisticsByCards styles="max-md:w-full md:w-[350px]"/>
        {/* <CardsListWidget styles="max-md:w-full md:w-[calc(100%-350px-25px)]"/> */}
      </section>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <CardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
        <BudgetCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
      </section>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <CardWidget cardId={searchParams.cardId}/>
        <BudgetWidget budgetId={searchParams.budgetId}/>
      </section>
    </>
  )
}
