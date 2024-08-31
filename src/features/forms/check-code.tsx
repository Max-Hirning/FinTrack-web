"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkCodeInput } from "shared/types/check-code"
import { checkCodeModel } from "shared/models/check-code"
import { checkCodeSchema } from "shared/schemas/check-code"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Button, InputOTP, InputOTPGroup, InputOTPSlot } from "shared/ui"

export function CheckCodeForm() {
  const form = useForm<checkCodeInput>({
    resolver: zodResolver(checkCodeSchema),
    defaultValues: checkCodeModel,
  })

  function onSubmit(values: checkCodeInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form 
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Code</FormLabel>
              <FormControl>
                <InputOTP 
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup className="w-full justify-center items-center">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >Check code</Button>
      </form>
    </Form>
  )
}
