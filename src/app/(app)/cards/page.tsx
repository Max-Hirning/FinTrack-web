"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { BudgetForm, CardForm } from "features/index"
import { useForm } from "react-hook-form"
import { budgetModel, cardModel } from "shared/models/card"
import { budgetSchema, cardSchema } from "shared/schemas/card"
import { budgetInput, cardInput } from "shared/types/card"
import { Button, Card, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "shared/ui"
import { CardsListWidget, ExpensesStatisticsByCards, GoalCardsListWidget, LoanCardsListWidget } from "widgets/index"

export default function Page() {
  const form = useForm<budgetInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: budgetModel,
  })

  function onSubmit(values: budgetInput) {
    console.log(values)
  }

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
        <section className="w-full max-w-[600px]">
          <h2 className="mb-[5px] text-2xl font-bold">Card form</h2>
          <Card className="p-[24px]">
            <CardForm/>
          </Card>
        </section>
        <section className="w-full max-w-[600px]">
          <h2 className="mb-[5px] text-2xl font-bold">Budget form</h2>
          <Card className="p-[24px] w-full">
            <BudgetForm/>
          </Card>
        </section>
      </section>
    </>
  )
}
