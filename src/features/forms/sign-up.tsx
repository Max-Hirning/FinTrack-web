"use client"

import { useForm } from "react-hook-form"
import { signUpInput } from "shared/types"
import { signUpModel } from "shared/models"
import { useRouter } from "next/navigation"
import { signUpSchema } from "shared/schemas"
import { useSignUp } from "src/shared/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpModel,
  })
  const {mutate: preSignUp, isPending: isSignUp} = useSignUp();

  function onSubmit({confirmPassword, ...values}: signUpInput) {
    preSignUp({confirmPassword, ...values}, {
      onSuccess: () => {
        router.push("/auth/sign-in")
      }
    })
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
          isLoading={isSignUp}
          disabled={!form.formState.isValid || isSignUp}
        >Sign up</Button>
      </form>
    </Form>
  )
}
