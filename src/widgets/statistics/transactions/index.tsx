"use client"

import { Card } from "shared/ui";
import { MyBarsChart as BarsChart } from "features/index";
import { useGetStatistic } from "shared/hooks";
import { getYearRange } from "shared/lib";
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
    <Card className={`h-[350px] p-[20px] w-full ${styles || ""}`}>
      <BarsChart 
        chartConfig={chartConfig}
        data={(statistics || []).map((el) => ({
          month: format(el.date, 'MMMM'), expenses: +(el.expenses.toFixed(2)), incomes: +(el.incomes.toFixed(2)),
        }))} 
      />
    </Card>
  )
}