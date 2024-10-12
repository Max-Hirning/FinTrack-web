"use client"

import qs from 'querystring';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { sendCodeInput } from "shared/types"
import { sendCodeModel } from "shared/models"
import { useSendCode } from "src/shared/hooks"
import { sendCodeSchema } from "shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui"

export function SendCodeForm() {
  const router = useRouter()
  const form = useForm<sendCodeInput>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: sendCodeModel,
  })
  const {mutate: sendCode, isPending: isSendCode} = useSendCode();

  function onSubmit(values: sendCodeInput) {
    sendCode(values, {
      onSuccess: (_, {email}) => {
        router.push(`/auth/check-code/${qs.stringify({ email })}`)
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
        <Button 
          type="submit"
          className="w-full"
          isLoading={isSendCode}
          disabled={!form.formState.isValid || isSendCode}
        >Send code</Button>
      </form>
    </Form>
  )
}
