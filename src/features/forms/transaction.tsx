"use client"

import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { transactionInput } from "shared/types"
import { transactionModel } from "shared/models"
import { transactionSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, MultipleSelect, DatePicker, Textarea } from "shared/ui"

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

export function TransactionForm() {
  const form = useForm<transactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transactionModel,
  });

  function onSubmit(values: transactionInput) {
    console.log({...values, date: format(values.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")});
    if(+values.amount === 0) form.setError("amount", {
      message: "Amount mustn't be equal to 0"
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
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Transaction amount</FormLabel>
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
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Transaction category</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction category" />
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
            name="cardId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Transaction card</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction card" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      cardsList.map((el, index) => {
                        return (
                          <SelectItem key={index} value={index.toString()}>{el.title}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Transaction date</FormLabel>
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
            name="goalId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Transaction goal</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction card" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      cardsList.map((el, index) => {
                        return (
                          <SelectItem key={index} value={index.toString()}>{el.title}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="loanId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Transaction loan</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction card" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      cardsList.map((el, index) => {
                        return (
                          <SelectItem key={index} value={index.toString()}>{el.title}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormLabel>Transaction description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
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
