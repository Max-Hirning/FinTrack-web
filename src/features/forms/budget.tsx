"use client"

import { useForm } from "react-hook-form"
import { budgetInput } from "shared/types"
import { budgetModel } from "shared/models"
import { budgetSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, MultipleSelect, DatePicker } from "shared/ui"
import { format } from "date-fns"

const cardsList = [
  {
    title: "Personal Savings",
    currency: "USD",
    startBalance: 5000,
  },
  {
    title: "Business Account",
    currency: "EUR",
    startBalance: 12000,
  },
  {
    title: "Vacation Fund",
    currency: "USD",
    startBalance: 1500,
  },
  {
    title: "Investment Portfolio",
    currency: "GBP",
    startBalance: 25000,
  },
  {
    title: "Emergency Fund",
    currency: "USD",
    startBalance: 3000,
  },
  {
    title: "Crypto Wallet",
    currency: "BTC",
    startBalance: 2,
  },
  {
    title: "Child's College Fund",
    currency: "USD",
    startBalance: 10000,
  },
  {
    title: "Home Renovation Fund",
    currency: "USD",
    startBalance: 8000,
  },
  {
    title: "Car Maintenance",
    currency: "USD",
    startBalance: 1200,
  },
  {
    title: "Charity Fund",
    currency: "USD",
    startBalance: 600,
  }
]

export function BudgetForm() {
  const form = useForm<budgetInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: budgetModel,
  });

  function onSubmit(values: budgetInput) {
    if(values.endDate) {
      values.endDate = format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    if(values.startDate) {
      values.startDate = format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    console.log(values);
    if(values.period === "oneTime") {
      if(!values.startDate || !values.endDate) {
        form.setError("startDate", {
          message: "Start date is required"
        })
        form.setError("endDate", {
          message: "End date is required"
        })
      }
    }
    if(+values.balance <= 0) form.setError("balance", {
      message: "Balance must be greater than 0"
    })
  }

  return (
    <Form {...form}>
      <form 
        className="flex flex-col gap-[20px] w-full"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Budget title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="currency"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Budget currency</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="balance"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Budget balance</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="period"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Budget period</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={(value) => {
                    if(value !== "oneTime") {
                      form.setValue("startDate", undefined);
                      form.setValue("endDate", undefined);
                      form.setError("startDate", {
                        message: undefined
                      })
                      form.setError("endDate", {
                        message: undefined
                      })
                    }
                    field.onChange(value);
                  }} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="oneTime">One time budget</SelectItem>
                    <SelectItem value="year">Yearly budget</SelectItem>
                    <SelectItem value="month">Monthly budget</SelectItem>
                    <SelectItem value="week">Weekly budget</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={`${form.watch().period !== "oneTime" && "hidden"} max-sm:items-center flex flex-row max-md:flex-col gap-[20px]`}>
          <FormField
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Budget start date</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(date) => field.onChange(date.toISOString())}
                    value={field.value ? new Date(field.value) : new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="endDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Budget end date</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(date) => field.onChange(date.toISOString())}
                    value={field.value ? new Date(field.value) : new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="cards"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Budget cards</FormLabel>
                <MultipleSelect
                  value={field.value}
                  onChange={field.onChange}
                  data={cardsList.map((el, index) => ({label: el.title, value: index.toString()}))}
                  title={field.value.length !== 0 ? `Chosen cards: ${field.value.length}` : `Choose cards`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="categories"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Budget categories</FormLabel>
                <MultipleSelect
                  value={field.value}
                  onChange={field.onChange}
                  data={cardsList.map((el, index) => ({label: el.title, value: index.toString()}))}
                  title={field.value.length !== 0 ? `Chosen categories: ${field.value.length}` : `Choose categories`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit"
          disabled={!form.formState.isValid}
          className="w-fit ml-auto mt-[10px]"
        >Save</Button>
      </form>
    </Form>
  )
}
