"use client"

import { format } from "date-fns"
import { useEffect } from "react"
import { goalInput } from "shared/types"
import { useForm } from "react-hook-form"
import { goalModel } from "shared/models"
import { useRouter } from "next/navigation"
import { goalSchema } from "shared/schemas"
import { useGetCurrencies } from "shared/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateGoal, useGetGoal, useUpdateGoal } from "shared/hooks"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, DatePicker } from "shared/ui"

interface IProps {
  goalId?: string;
}

export function GoalForm({goalId}: IProps) {
  const router = useRouter();
  const form = useForm<goalInput>({
    resolver: zodResolver(goalSchema),
    defaultValues: goalModel,
  });
  const {data: goal} = useGetGoal(goalId);
  const {data: currencies} = useGetCurrencies();
  const {mutate: createGoal, isPending: isCreateGoal} = useCreateGoal();
  const {mutate: updateGoal, isPending: isUpdateGoal} = useUpdateGoal();

  useEffect(() => {
    if(goal) {
      form.reset({
        title: goal.title,
        currency: goal.currency,
        deadline: goal.deadline,
        description: goal.description,
        amount: goal.amount.toString(),
        balance: goal.balance.toString(),
      });
    }
  }, [form, goal])

  function onSubmit(values: goalInput) {
    console.log({...values, deadline: format(values.deadline, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")});
    if(+values.balance <= 0) form.setError("balance", {
      message: "Balance must be greater than 0"
    })
    if(+values.amount < 0) form.setError("amount", {
      message: "Amount must be greater or equal than 0"
    })
    if(goalId) {
      updateGoal({...values, goalId}, {
        onSuccess: () => {
          form.reset(goalModel);
          router.replace("/accounts");
        }
      });
    } else {      
      createGoal(values, {
        onSuccess: () => {
          form.reset(goalModel);
        }
      });
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
                <FormLabel>Goal title</FormLabel>
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
                <FormLabel>Goal currency</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal currency" />
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
                <FormLabel>Goal balance</FormLabel>
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
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Goal amount</FormLabel>
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
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Goal description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="deadline"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Goal deadline</FormLabel>
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
        <Button 
          type="submit"
          className="w-fit ml-auto mt-[10px]"
          isLoading={isCreateGoal || isUpdateGoal}
          disabled={!form.formState.isValid || isCreateGoal || isUpdateGoal}
        >Save</Button>
      </form>
    </Form>
  )
}
