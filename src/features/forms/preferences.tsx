"use client";

import { useForm } from "react-hook-form";
import { preferencesInput } from "shared/types";
import { preferencesModel } from "shared/models";
import { preferencesSchema } from "shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCurrencies, useGetUser, useUpdateUser } from "shared/hooks";
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
  const {mutate: updateUser, isPending: isUpdateUser} = useUpdateUser()

  function onSubmit(values: preferencesInput) {
    updateUser({...values, userId}, {
      onSuccess: () => {
        form.reset(preferencesModel)
      }
    })
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
          name="budgetNotification"
          render={({ field }) => (
            <FormItem className="w-fit gap-[20px] flex flex-row items-center justify-between">
              <FormControl>
                <>
                  <Switch
                    onCheckedChange={field.onChange}
                    checked={(field.value === undefined) ? user?.budgetNotification : field.value}
                  />
                  <p style={{marginTop: 0}}>Budget notifications</p>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goalNotification"
          render={({ field }) => (
            <FormItem className="w-fit gap-[20px] flex flex-row items-center justify-between">
              <FormControl>
                <>
                  <Switch
                    onCheckedChange={field.onChange}
                    checked={(field.value === undefined) ? user?.goalNotification : field.value}
                  />
                  <p style={{marginTop: 0}}>Goal notifications</p>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loanNotification"
          render={({ field }) => (
            <FormItem className="w-fit gap-[20px] flex flex-row items-center justify-between">
              <FormControl>
                <>
                  <Switch
                    onCheckedChange={field.onChange}
                    checked={(field.value === undefined) ? user?.loanNotification : field.value}
                  />
                  <p style={{marginTop: 0}}>Loan notifications</p>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          isLoading={isUpdateUser}
          className="w-fit ml-auto mt-[10px]"
          disabled={!form.formState.isValid || isUpdateUser || !(Object.values(form.watch()).some((el) => el !== undefined))}
        >Save</Button>
      </form>
    </Form>
  )
}
