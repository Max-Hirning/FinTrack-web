"use client"

import { Card } from "shared/ui";
import { format } from "date-fns";
import { getYearRange } from "shared/lib";
import { MyBarsChart as BarsChart } from "features/index";
import { useGetStatistic, useGetUser } from "shared/hooks";

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

export function GoalsTransactionsStatisticsWidget({userId, styles}: IProps) {
  const {data: user} = useGetUser(userId);
  const {startDate, endDate} = getYearRange();

  const {data: statistics} = useGetStatistic({
    userId,
    endDate,
    startDate,
    loanIds: [],
    cardIds: [],
    budgetIds: [],
    frequency: "month",
    goalIds: (user?.goals || []).map((el) => el.id),
  });

  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[18px]">
        <h2 className="text-2xl font-bold">Goals Expense/Income Statistics</h2>
      </article>
      <Card className="h-[350px] p-[20px]">
        <BarsChart data={(statistics || []).map((el) => ({
          month: format(el.date, 'MMMM'), expenses: +(el.expenses.toFixed(2)), incomes: +(el.incomes.toFixed(2)),
        }))} chartConfig={chartConfig}/>
      </Card>
    </section>
  )
}