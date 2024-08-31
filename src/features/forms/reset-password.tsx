"use client"

import { Input } from "shared/ui/input"
import { Button } from "shared/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordModel } from "shared/models/reset-password"
import { resetPasswordInput } from "shared/types/reset-password"
import { resetPasswordSchema } from "shared/schemas/reset-password"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"

export function ResetPasswordForm() {
  const form = useForm<resetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordModel,
  })

  function onSubmit(values: resetPasswordInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form 
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Password</FormLabel>
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
              <FormLabel>Confirm password</FormLabel>
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
          className="w-full"
          disabled={!form.formState.isValid}
        >Reset password</Button>
      </form>
    </Form>
  )
}
