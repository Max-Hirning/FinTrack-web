"use client"

import { useForm } from "react-hook-form"
import { sendCodeInput } from "shared/types"
import { sendCodeModel } from "shared/models"
import { sendCodeSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function SendCodeForm() {
  const form = useForm<sendCodeInput>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: sendCodeModel,
  })

  function onSubmit(values: sendCodeInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form 
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="email@gmail.com" 
                  type="email"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >Send code</Button>
      </form>
    </Form>
  )
}
