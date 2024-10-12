"use client"

import { useForm } from "react-hook-form"
import { resetPasswordInput } from "shared/types"
import { resetPasswordModel } from "shared/models"
import { useResetPassword } from "src/shared/hooks"
import { resetPasswordSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function ResetPasswordForm() {
  const form = useForm<resetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordModel,
  })
  const {mutate: resetPassword, isPending: isResetPassword} = useResetPassword();

  function onSubmit({confirmPassword, ...values}: resetPasswordInput) {
    resetPassword(values)
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
          isLoading={isResetPassword}
          disabled={!form.formState.isValid || isResetPassword}
        >Reset password</Button>
      </form>
    </Form>
  )
}
