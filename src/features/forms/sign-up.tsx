"use client"

import { useForm } from "react-hook-form"
import { signUpInput } from "shared/types/sign-up"
import { signUpModel } from "shared/models/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "shared/schemas/sign-up"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function SignUpForm() {
  const form = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpModel,
  })

  function onSubmit(values: signUpInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form 
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Joseph" 
                  type="text"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Hoffenhof" 
                  type="text"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        >Sign up</Button>
      </form>
    </Form>
  )
}
