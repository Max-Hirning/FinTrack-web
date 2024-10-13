"use client"

import { useForm } from "react-hook-form"
import { settingsInput } from "shared/types"
import { settingsModel } from "shared/models"
import { settingsSchema } from "shared/schemas"
import { useUpdateUserPassword } from "shared/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

interface IProps {
  userId: string
}

export function SettingsForm({userId}: IProps) {
  const form = useForm<settingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settingsModel,
  });
  const {mutate: updateUser, isPending: isUpdateUser} = useUpdateUserPassword()

  function onSubmit(values: settingsInput) {
    updateUser({...values, userId})
  }

  return (
    <Form {...form}>
      <form 
        className="grid gap-[20px] w-full"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          isLoading={isUpdateUser}
          className="w-fit ml-auto mt-[10px]"
          disabled={!form.formState.isValid || isUpdateUser}
        >Save</Button>
      </form>
    </Form>
  )
}
