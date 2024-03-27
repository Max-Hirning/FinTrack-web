"use client";

import "chart.js/auto";
import {Bar} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {getWeekDayName} from "@/controllers/dates";
import {useGetWeeklyStatistics} from "../hooks/getWeeklyStatistics";
import {IWeeklyStatisticsFilters, IWeeklyStatisticsResponse} from "../types/weeklyStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: IWeeklyStatisticsFilters;
}

export function WeeklyStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetWeeklyStatistics(filters, session.jwt);

  return (
    <Bar
      data={{
        labels: (data?.data) ? Object.keys(data.data).map((el: string) => getWeekDayName(el)) : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Incomes",
            data: (data?.data) ? Object.values(data.data).map((el: IWeeklyStatisticsResponse) => el.incomes) : [0,0,0,0,0,0,0],
            backgroundColor: "#41D4A8",
          },
          {
            label: "Expenses",
            data: (data?.data) ? Object.values(data.data).map((el: IWeeklyStatisticsResponse) => el.expenses) : [0,0,0,0,0,0,0],
            backgroundColor: "#FF4B4A",
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            align: "end" as const,
            position: "top" as const,
          },
        },
      }}
      className='w-full h-full'
      aria-label="Transactions weekly statistics(current week)"
    />
  );
}
