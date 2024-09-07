"use client"

import { useForm } from "react-hook-form"
import { profileInput, settingsInput } from "shared/types/profile"
import { profileModel, settingsModel } from "shared/models/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSechema, settingsSechema } from "shared/schemas/profile"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function SettingsForm() {
  const form = useForm<settingsInput>({
    resolver: zodResolver(settingsSechema),
    defaultValues: settingsModel,
  })

  function onSubmit(values: settingsInput) {
    console.log(values)
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
          disabled={!form.formState.isValid}
          className="w-fit ml-auto mt-[10px]"
        >Save</Button>
      </form>
    </Form>
  )
}