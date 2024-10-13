"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { cardInput } from "shared/types/card"
import { cardModel } from "shared/models/card"
import { cardSchema } from "shared/schemas/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateCard, useGetCard, useGetCurrencies, useUpdateCard } from "shared/hooks"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "shared/ui"

interface IProps {
  cardId?: string;
}

export function CardForm({cardId}: IProps) {
  const router = useRouter();
  const form = useForm<cardInput>({
    resolver: zodResolver(cardSchema),
    defaultValues: cardModel,
  });
  const {data: card} = useGetCard(cardId);
  const {data: currencies} = useGetCurrencies();
  const {mutate: createCard, isPending: isCreateCard} = useCreateCard();
  const {mutate: updateCard, isPending: isUpdateCard} = useUpdateCard();

  useEffect(() => {
    if(card) {
      form.reset({
        title: card.title,
        color: card.color,
        currency: card.currency,
        startBalance: card.balance.toString()
      });
    }
  }, [form, card])

  function onSubmit(values: cardInput) {
    if(cardId) {
      updateCard({...values, cardId}, {
        onSuccess: () => {
          form.reset(cardModel);
          router.replace("/cards");
        }
      });
    } else {      
      createCard(values, {
        onSuccess: () => {
          form.reset(cardModel);
        }
      });
    }
  }

  return (
    <Form {...form}>
      <form 
        className="flex flex-col gap-[20px] w-full"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Card title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="currency"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Card currency</FormLabel>
                <Select 
                  value={field.value}
                  disabled={!!cardId}
                  onValueChange={field.onChange} 
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select card currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      (currencies || []).map((el) => {
                        return (
                          <SelectItem key={el.id} value={el.id}>{el.title}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="startBalance"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Card balance</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number"
                    disabled={!!cardId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="color"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <FormLabel>Card color</FormLabel>
                <FormControl>
                  <Input {...field} type="color" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit"
          className="w-fit ml-auto mt-[10px]"
          isLoading={isCreateCard || isUpdateCard}
          disabled={!form.formState.isValid || isCreateCard || isUpdateCard}
        >Save</Button>
      </form>
    </Form>
  )
}
