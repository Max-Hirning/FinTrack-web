"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { signInInput } from "shared/types"
import { signInModel } from "shared/models"
import { signInSchema } from "shared/schemas"
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
        <Link 
          href="/auth/forgot-password"
          className="underline ml-auto"
        >Forgot password?</Link>
        <Button 
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >Sign in</Button>
      </form>
    </Form>
  )
}
