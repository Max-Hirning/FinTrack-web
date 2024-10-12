"use client";

import { useForm } from "react-hook-form";
import { preferencesInput } from "shared/types";
import { preferencesModel } from "shared/models";
import { preferencesSchema } from "shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCurrencies, useGetUser } from "shared/hooks";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from "shared/ui";

interface IProps {
  userId: string;
}

export function PreferencesForm({userId}: IProps) {
  const form = useForm<preferencesInput>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: preferencesModel,
  })
  const {data: user} = useGetUser(userId);
  const {data: currencies} = useGetCurrencies();

  function onSubmit(values: preferencesInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-[20px] w-full"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          name="currency"
          control={form.control}
          render={({ field }) => (
            <FormItem className="max-w-[400px]">
              <FormLabel>Currency</FormLabel>
              <Select 
                value={field.value}
                onValueChange={field.onChange} 
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={user?.currency} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    (currencies || []).map((el) => {
                      return (
                        <SelectItem value={el.id} key={el.id}>{el.title}</SelectItem>
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
          control={form.control}
          name="budgetNotifications"
          render={({ field }) => (
            <FormItem className="w-fit gap-[20px] flex flex-row items-center justify-between">
              <FormControl>
                <>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <p style={{marginTop: 0}}>Budget notifications</p>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goalNotifications"
          render={({ field }) => (
            <FormItem className="w-fit gap-[20px] flex flex-row items-center justify-between">
              <FormControl>
                <>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <p style={{marginTop: 0}}>Goal notifications</p>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loanNotifications"
          render={({ field }) => (
            <FormItem className="w-fit gap-[20px] flex flex-row items-center justify-between">
              <FormControl>
                <>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <p style={{marginTop: 0}}>Loan notifications</p>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          disabled={!form.formState.isValid}
          className="w-fit ml-auto mt-[10px]"
        >Save</Button>
      </form>
    </Form>
  )
}
