"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { signInInput } from "shared/types/sign-in"
import { signInModel } from "shared/models/sign-in"
import { signInSchema } from "shared/schemas/sign-in"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function SignInForm() {
  const form = useForm<signInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInModel,
  })

  function onSubmit(values: signInInput) {
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
        <div className="flex items-center justify-between">
          <Link 
            className="underline"
            href="/auth/verify-email/request"
          >Verify email</Link>
          <Link 
            className="underline"
            href="/auth/forgot-password"
          >Forgot password?</Link>
        </div>
        <Button 
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >Sign in</Button>
      </form>
    </Form>
  )
}
