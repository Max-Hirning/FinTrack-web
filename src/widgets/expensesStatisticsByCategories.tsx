import * as React from "react"
import { Card, CardContent } from "shared/ui"
import { MyPieChart as PieChart } from "features/charts/pie";

interface IProps {
  styles?: string;
}

export function ExpensesStatisticsByCategories({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">Expense Statistics</h2>
      </article>
      <Card className="h-[350px] p-[20px]">
        <CardContent className="w-full h-full p-0">
          <PieChart/>
        </CardContent>
      </Card>
    </section>
  )
}