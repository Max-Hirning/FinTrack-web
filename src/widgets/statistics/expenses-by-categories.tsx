"use client";

import { ChartConfig } from "shared/ui"
import { getMonthRange } from "shared/lib";
import { MyPieChart as PieChart } from "features/index";
import { useGetCategoriesStatistic } from "shared/hooks";

interface IProps {
  userId: string;
}

export function ExpensesStatisticsByCategories({userId}: IProps) {
  const {startDate, endDate} = getMonthRange();

  const query = {
    userId,
    endDate,
    startDate,
    cardIds: [],
  };

  const {data} = useGetCategoriesStatistic(query);

  console.log('useGetCategoriesStatistic', data);

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