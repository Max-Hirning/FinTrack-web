"use client"

import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { checkCodeInput } from "shared/types"
import { checkCodeModel } from "shared/models"
import { checkCodeSchema } from "shared/schemas"
import { Hourglass, RotateCw } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCheckCode, useSendCode } from "src/shared/hooks"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Button, InputOTP, InputOTPGroup, InputOTPSlot } from "shared/ui"

export function CheckCodeForm() {
  const router = useRouter()
  const form = useForm<checkCodeInput>({
    resolver: zodResolver(checkCodeSchema),
    defaultValues: checkCodeModel,
  })
  const [timer, setTimer] = useState<number>(59);
  const {mutate: sendCode, isPending: isSendCode} = useSendCode()
  const {mutate: checkCode, isPending: isCheckCode} = useCheckCode()
  const [resendCodeAvailable, setResendCodeAvailable] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!resendCodeAvailable) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setResendCodeAvailable(true);
            return 59;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCodeAvailable]);

  function resendCode() {
    sendCode({email: ""}, {
      onSuccess: () => {
        router.push("/auth/reset-password")
      }
    })
  }
  function onSubmit(values: checkCodeInput) {
    checkCode(values)
  }

  return (
    <Form {...form}>
      <form 
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Code</FormLabel>
              <FormControl>
                <InputOTP 
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup className="w-full justify-center items-center">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button 
            type="submit"
            className="w-full"
            isLoading={isCheckCode}
            disabled={!form.formState.isValid || isCheckCode}
          >Check code</Button>
          <Button
            type="button"
            variant="outline"
            onClick={resendCode}
            disabled={!resendCodeAvailable || !!isSendCode || !!isCheckCode}
          >
            {resendCodeAvailable && !isSendCode ? (
              <RotateCw size={20} className="mr-2 text-foreground" />
            ) : (
              <Hourglass
                size={20}
                className="mr-2 text-foreground animate-spin-slow"
              />
            )}
            {resendCodeAvailable
              ? 'Send code again'
              : `Resend the code in ${timer} sec`}
          </Button>
        </div>
      </form>
    </Form>
  )
}
