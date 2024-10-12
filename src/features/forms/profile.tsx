"use client"

import { useForm } from "react-hook-form"
import { useGetUser } from "shared/hooks"
import { profileInput } from "shared/types"
import { profileModel } from "shared/models"
import { profileSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, DatePicker } from "shared/ui"

interface IProps {
  userId: string;
}

export function ProfileForm({userId}: IProps) {
  const form = useForm<profileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileModel,
  })
  const {data: user} = useGetUser(userId);

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
                    value={field.value || ""}
                    placeholder={user?.firstName || "Joseph"}
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
                    value={field.value || ""}
                    placeholder={user?.lastName || "Hoffenhof"} 
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
                    placeholder={user?.email || "email@gmail.com"} 
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
                    value={field.value ? new Date(field.value) : (user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit"
          className="w-fit ml-auto mt-[10px]"
          disabled={!form.formState.isValid || !(Object.values(form.watch()).some((el) => !!el))}
        >Save</Button>
      </form>
    </Form>
  )
}
