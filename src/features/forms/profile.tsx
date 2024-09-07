"use client"

import { useForm } from "react-hook-form"
import { profileInput } from "shared/types/profile"
import { profileModel } from "shared/models/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSechema } from "shared/schemas/profile"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function ProfileForm() {
  const form = useForm<profileInput>({
    resolver: zodResolver(profileSechema),
    defaultValues: profileModel,
  })

  function onSubmit(values: profileInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form 
        className="grid gap-[20px] w-full"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid gap-2 max-w-[400px] w-full">
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
              <FormItem className="grid gap-2 max-w-[400px] w-full">
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
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid gap-2 max-w-[400px] w-full">
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
          {/* date picker */}
        </div>
        <Button 
          type="submit"
          disabled={!form.formState.isValid}
          className="w-fit ml-auto mt-[10px]"
        >Save</Button>
      </form>
    </Form>
  )
}
