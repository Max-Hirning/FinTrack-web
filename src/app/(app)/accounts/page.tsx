import { AccountsCardsListWidget, GoalWidget, LoanWidget, GoalCardsListWidget, LoanCardsListWidget } from "widgets/index"

interface IProps {
  searchParams: { 
    goalId?: string;
    loanId?: string;
  }
}

export default function Page({searchParams}: IProps) {
  return (
    <>
      <AccountsCardsListWidget/>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <LoanCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
        <GoalCardsListWidget styles="max-md:w-full md:w-[calc(50%-12.5px)]"/>
      </section>
      <section className="flex max-md:flex-col mt-[25px] w-full gap-[25px]">
        <GoalWidget goalId={searchParams.goalId}/>
        <LoanWidget/>
      </section>
    </>
  )
}
