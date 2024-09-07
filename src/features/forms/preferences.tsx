"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { preferencesModel } from "shared/models/profile";
import { preferencesSechema } from "shared/schemas/profile";
import { preferencesInput } from "shared/types/profile";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from "shared/ui";

export function PreferencesForm() {
  const form = useForm<preferencesInput>({
    resolver: zodResolver(preferencesSechema),
    defaultValues: preferencesModel,
  })

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
                    <SelectValue placeholder="USD" />
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
        <Button 
          type="submit"
          disabled={!form.formState.isValid}
          className="w-fit ml-auto mt-[10px]"
        >Save</Button>
      </form>
    </Form>
  )
}
