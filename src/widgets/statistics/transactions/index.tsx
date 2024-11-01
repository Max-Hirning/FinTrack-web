"use client"

import { Card } from "shared/ui";
import { MyBarsChart as BarsChart } from "features/index";
import { useGetStatistic } from "src/shared/hooks";
import { getYearRange } from "src/shared/lib";
import { format } from "date-fns";

interface IProps {
  userId: string;
  styles?: string;
}

const chartConfig = {
  expenses: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
  incomes: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
}

export function TransactionsStatisticsWidget({userId, styles}: IProps) {
  const {startDate, endDate} = getYearRange();

  const {data: statistics} = useGetStatistic({
    userId,
    endDate,
    startDate,
    cardIds: [],
    frequency: "month",
  });

  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">Expense/Income Statistics</h2>
      </article>
      <Card className="h-[350px] p-[20px]">
        <BarsChart data={(statistics || []).map((el) => ({
          month: format(el.date, 'MMMM'), expenses: +(el.expenses.toFixed(2)), incomes: +(el.incomes.toFixed(2)),
        }))} chartConfig={chartConfig}/>
      </Card>
    </section>
  )
}