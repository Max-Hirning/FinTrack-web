"use client"

import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { transactionInput } from "shared/types"
import { transactionModel } from "shared/models"
import { transactionSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetUser, useGetCategories, useCreateTransaction, useUpdateTransaction, useGetTransaction } from "shared/hooks"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, DatePicker, Textarea } from "shared/ui"
import { useEffect } from "react"

interface IProps {
  userId: string;
  transactionId?: string;
}

export function TransactionForm({userId, transactionId}: IProps) {
  const form = useForm<transactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transactionModel,
  });
  const router = useRouter();
  const {data: user} = useGetUser(userId)
  const {data: categories} = useGetCategories([userId])
  const {data: transaction} = useGetTransaction(transactionId);
  const {mutate: createTransaction, isPending: isCreateTransaction} = useCreateTransaction();
  const {mutate: updateTransaction, isPending: isUpdateTransaction} = useUpdateTransaction();

  useEffect(() => {
    if(transaction) {
      form.reset({
        date: transaction.date,
        cardId: transaction.card.id,
        goalId: transaction.goal?.id,
        loanId: transaction.loan?.id,
        categoryId: transaction.category.id,
        description: transaction.description,
        amount: transaction.amount.toString(),
      });
    }
  }, [form, transaction])

  function onSubmit(values: transactionInput) {
    console.log({...values, date: format(values.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")});
    if(+values.amount === 0) form.setError("amount", {
      message: "Amount mustn't be equal to 0"
    })
    if(transactionId) {
      updateTransaction({...values, transactionId}, {
        onSuccess: () => {
          form.reset(transactionModel);
          router.replace("/");
        }
      });
    } else {      
      createTransaction(values, {
        onSuccess: () => {
          form.reset(transactionModel);
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
            name="categoryId"
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
                    {
                      (categories || []).map((el) => {
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
                      (user?.cards || []).map((el) => {
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
                      (user?.goals || []).map((el) => {
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
                      (user?.loans || []).map((el) => {
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
          className="w-fit ml-auto mt-[10px]"
          isLoading={isCreateTransaction || isUpdateTransaction}
          disabled={!form.formState.isValid || isCreateTransaction || isUpdateTransaction}
        >Save</Button>
      </form>
    </Form>
  )
}
