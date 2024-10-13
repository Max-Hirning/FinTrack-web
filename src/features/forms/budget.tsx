"use client"

import { useEffect } from "react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { budgetInput } from "shared/types"
import { budgetModel } from "shared/models"
import { budgetSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateBudget, useGetBudget, useGetCategories, useGetCurrencies, useGetUser } from "shared/hooks"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, MultipleSelect, DatePicker } from "shared/ui"

interface IProps {
  userId: string;
  budgetId?: string;
}

export function BudgetForm({userId, budgetId}: IProps) {
  const form = useForm<budgetInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: budgetModel,
  });
  const {data: user} = useGetUser(userId)
  const {data: budget} = useGetBudget(budgetId);
  const {data: currencies} = useGetCurrencies();
  const {data: categories} = useGetCategories([userId]);
  const {mutate: createBudget, isPending: isCreateBudget} = useCreateBudget();

  useEffect(() => {
    if(budget) {
      form.reset({
        title: budget.title,
        cardIds: budget.cards,
        period: budget.period,
        endDate: budget.endDate,
        currency: budget.currency,
        startDate: budget.startDate,
        categoryIds: budget.categories,
        balance: budget.balance.toString(),
      });
    }
  }, [form, budget])

  function onSubmit(values: budgetInput) {
    if(values.endDate) {
      values.endDate = format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    if(values.startDate) {
      values.startDate = format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
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
    if(budgetId) {
      
    } else {
      createBudget(values);
    }
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
                    {
                      (currencies || []).map((el) => {
                        return (
                          <SelectItem key={el.id} value={el.id}>{el.title}</SelectItem>
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
            name="cardIds"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Budget cards</FormLabel>
                <MultipleSelect
                  value={field.value}
                  onChange={field.onChange}
                  data={(user?.cards || []).map((el) => ({label: el.title, value: el.id}))}
                  title={field.value.length !== 0 ? `Chosen cards: ${field.value.length}` : `Choose cards`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="categoryIds"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Budget categories</FormLabel>
                <MultipleSelect
                  value={field.value}
                  onChange={field.onChange}
                  data={(categories || []).map((el) => ({label: el.title, value: el.id}))}
                  title={field.value.length !== 0 ? `Chosen categories: ${field.value.length}` : `Choose categories`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit"
          isLoading={isCreateBudget}
          className="w-fit ml-auto mt-[10px]"
          disabled={!form.formState.isValid || isCreateBudget}
        >Save</Button>
      </form>
    </Form>
  )
}
