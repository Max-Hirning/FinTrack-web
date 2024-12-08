"use client";

import { Card } from "shared/ui";
import { format } from "date-fns";
import { getYearRange } from "shared/lib";
import { useGetStatistic } from "shared/hooks";
import { MyBarsChart as BarsChart } from "features/index";

interface IProps {
  userId: string;
}

const chartConfig = {
  expenses: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
}

export function ExpensesStatisticsWidget({userId}: IProps) {
  const {startDate, endDate} = getYearRange();

  const {data: statistics} = useGetStatistic({
    userId,
    endDate,
    startDate,
    cardIds: [],
    frequency: "month",
  });

  return (
    <Card className="h-[235px] w-[390px] p-[20px]">
      <BarsChart data={(statistics || []).map((el) => ({
        month: format(el.date, 'MMMM'), expenses: +(el.expenses.toFixed(2)),
      }))} chartConfig={chartConfig}/>
    </Card>
  )
}