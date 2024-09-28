"use client"

import { useForm } from "react-hook-form"
import { profileInput } from "shared/types"
import { profileModel } from "shared/models"
import { profileSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, DatePicker } from "shared/ui"

export function ProfileForm() {
  const form = useForm<profileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileModel,
  })

  function onSubmit(values: profileInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form 
        className="flex flex-col gap-[20px] w-full"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="text"
                    placeholder="Joseph" 
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
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
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="text"
                    placeholder="Hoffenhof" 
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
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
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email"
                    value={field.value || ""}
                    placeholder="email@gmail.com" 
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="dateOfBirth"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <DatePicker 
                    onChange={field.onChange}
                    value={field.value ? new Date(field.value) : new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit"
          disabled={!form.formState.isValid || !(Object.values(form.watch()).some((el) => !!el))}
          className="w-fit ml-auto mt-[10px]"
        >Save</Button>
      </form>
    </Form>
  )
}
