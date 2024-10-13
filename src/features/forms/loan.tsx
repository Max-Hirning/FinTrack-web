"use client"

import { format } from "date-fns"
import { useEffect } from "react"
import { loanInput } from "shared/types"
import { useForm } from "react-hook-form"
import { loanModel } from "shared/models"
import { loanSchema } from "shared/schemas"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateLoan, useGetCurrencies, useGetLoan, useUpdateLoan } from "shared/hooks"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, DatePicker } from "shared/ui"

interface IProps {
  loanId?: string;
}

export function LoanForm({loanId}: IProps) {
  const router = useRouter();
  const form = useForm<loanInput>({
    resolver: zodResolver(loanSchema),
    defaultValues: loanModel,
  });
  const {data: loan} = useGetLoan(loanId);
  const {data: currencies} = useGetCurrencies();
  const {mutate: createLoan, isPending: isCreateLoan} = useCreateLoan();
  const {mutate: updateLoan, isPending: isUpdateLoan} = useUpdateLoan();

  useEffect(() => {
    if(loan) {
      form.reset({
        date: loan.date,
        title: loan.title,
        currency: loan.currency,
        deadline: loan.deadline,
        description: loan.description,
        amount: loan.amount.toString(),
      });
    }
  }, [form, loan])

  function onSubmit(values: loanInput) {
    if(+values.amount === 0) form.setError("amount", {
      message: "Amount mustm't be equal to 0"
    })
    if(loanId) {
      updateLoan({...values, loanId}, {
        onSuccess: () => {
          form.reset(loanModel);
          router.replace("/accounts");
        }
      });
    } else {      
      createLoan(values, {
        onSuccess: () => {
          form.reset(loanModel);
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
                <FormLabel>Loan title</FormLabel>
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
                <FormLabel>Loan currency</FormLabel>
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
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Loan amount</FormLabel>
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Loan description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col md:max-w-[400px] gap-2 w-full">
                <FormLabel>Loan date</FormLabel>
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
            name="deadline"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Loan deadline</FormLabel>
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
          isLoading={isCreateLoan || isUpdateLoan}
          disabled={!form.formState.isValid || isCreateLoan || isUpdateLoan}
        >Save</Button>
      </form>
    </Form>
  )
}
