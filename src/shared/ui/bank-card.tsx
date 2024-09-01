import { Cpu } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

export function BankCard() {
  return (
    <Card className="w-full max-w-[350px] min-w-[350px] h-[235px] justify-between flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <article>
          <CardTitle className="text-lg font-semibold">John Doe</CardTitle>
          <CardTitle className="text-lg font-semibold">**9793</CardTitle>
        </article>
        <Cpu />
      </CardHeader>
      <CardFooter className="flex-col items-start">
        <CardTitle className="font-normal text-base">Balance</CardTitle>
        <CardDescription className="font-semibold text-2xl">USD 41900.01</CardDescription>
      </CardFooter>
    </Card>
  )
}