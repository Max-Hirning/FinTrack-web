import { Card, ChartConfig } from "shared/ui";
import { MyBarsChart as BarsChart } from "features/index";

interface IProps {
  styles?: string;
}

const data = [
  { month: "January", desktop: 186, },
  { month: "February", desktop: 305, },
  { month: "March", desktop: 237, },
  { month: "April", desktop: 73, },
  { month: "May", desktop: 209, },
  { month: "June", desktop: 214, },
  { month: "January", desktop: 186, },
  { month: "February", desktop: 305, },
  { month: "March", desktop: 237, },
  { month: "April", desktop: 73, },
  { month: "May", desktop: 209, },
  { month: "June", desktop: 214, },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}

export function ExpensesStatisticsWidget({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">My Expense</h2>
      </article>
      <Card className="h-[235px] max-w-[350px] p-[20px]">
        <BarsChart data={data} chartConfig={chartConfig}/>
      </Card>
    </section>
  )
}