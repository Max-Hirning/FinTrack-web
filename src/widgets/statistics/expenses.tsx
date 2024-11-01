"use client";

import { Card } from "shared/ui";
import { format } from "date-fns";
import { getYearRange } from "shared/lib";
import { useGetStatistic } from "shared/hooks";
import { MyBarsChart as BarsChart } from "features/index";

interface IProps {
  userId: string;
  styles?: string;
}

const chartConfig = {
  expenses: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
}

export function ExpensesStatisticsWidget({userId, styles}: IProps) {
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
      <article className="flex items-end justify-between mb-[18px]">
        <h2 className="text-2xl font-bold">My Expense</h2>
      </article>
      <Card className="h-[235px] max-w-[350px] p-[20px]">
        <BarsChart data={(statistics || []).map((el) => ({
          month: format(el.date, 'MMMM'), expenses: +(el.expenses.toFixed(2)),
        }))} chartConfig={chartConfig}/>
      </Card>
    </section>
  )
}