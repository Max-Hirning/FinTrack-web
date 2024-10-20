"use client";

import { ChartConfig } from "shared/ui"
import { getMonthRange } from "shared/lib";
import { useGetCardsStatistic } from "shared/hooks";
import { MyPieChart as PieChart } from "features/index";

interface IProps {
  userId: string;
}

export function ExpensesStatisticsByCards({userId}: IProps) {
  const {startDate, endDate} = getMonthRange();

  const query = {
    userId,
    endDate,
    startDate,
    cardIds: [],
  };

  const {data} = useGetCardsStatistic(query);

  console.log('useGetCardsStatistic', data)

  return (
    <PieChart 
      chartData={data || []}
      chartConfig={(data || []).reduce((res, el) => {
        res[el.title.toLowerCase()] = {
          color: el.fill,
          label: el.title,
        }
        return res;
      }, {} as ChartConfig)}
    />
  )
}