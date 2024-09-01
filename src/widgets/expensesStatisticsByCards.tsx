import * as React from "react"
import { Card, CardContent } from "shared/ui"
import { MyPieChart as PieChart } from "features/charts/pie";

interface IProps {
  styles?: string;
}

export function ExpensesStatisticsByCards({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">Card Expense Statistics</h2>
      </article>
      <Card className="p-[20px] h-[235px]">
        <CardContent className="w-full h-full p-0">
          <PieChart/>
        </CardContent>
      </Card>
    </section>
  )
}