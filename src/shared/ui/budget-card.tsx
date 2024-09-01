import { WalletMinimal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "shared/ui"

export function BudgetCard() {
  const amount = 400;
  const balance = 800;
  const percentage = (amount / balance) * 100;
  const width = percentage >= 100 ? 100 : percentage;

  return (
    <Card className="p-[24px] w-full max-w-[350px] min-w-[350px] h-[235px] justify-between flex flex-col">
      <CardHeader className="p-0 flex flex-col gap-[15px]">
        <article className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">My Budget</CardTitle>
          <WalletMinimal />
        </article>
        <CardTitle className="font-normal text-base">Period: month</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-[10px]">
        <CardDescription className="font-normal text-base self-end">USD 624.00/827.00</CardDescription>
        <div className="relative w-full h-[8px]">
          <div className="absolute z-10 w-full h-[8px] bg-gray-300"/>
          <div 
            style={{
              width: `${width}%`,
            }}
            className={`absolute z-20 h-[8px] ${(amount / balance < 1) ? "bg-green-500" : "bg-red-500"}`} 
          />
        </div>
      </CardContent>
    </Card>
  )
}
