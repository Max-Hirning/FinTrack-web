"use client"

import { Input } from "shared/ui/input"
import { Button } from "shared/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendCodeInput } from "shared/types/send-code"
import { sendCodeModel } from "shared/models/send-code"
import { sendCodeSchema } from "shared/schemas/send-code"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"

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
