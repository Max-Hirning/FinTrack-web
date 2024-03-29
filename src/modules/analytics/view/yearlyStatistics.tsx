"use client";

import "chart.js/auto";
import {Bar} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {getMonthName} from "@/controllers/dates";
import {useGetYearlyStatistics} from "../hooks/getYearlyStatistics";
import {IYearlyStatisticsFilters, IYearlyStatisticsResponse} from "../types/yearlyStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: IYearlyStatisticsFilters;
}

export function YearlyStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetYearlyStatistics(filters, session.jwt);

  return (
    <Bar
      data={{
        labels: (data?.data) ? Object.keys(data.data).map((el: string) => getMonthName(+el)) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Incomes",
            data: (data?.data) ? Object.values(data.data).map((el: IYearlyStatisticsResponse) => el.incomes) : [0,0,0,0,0,0,0,0,0,0,0,0],
            backgroundColor: "#41D4A8",
          },
          {
            label: "Expenses",
            data: (data?.data) ? Object.values(data.data).map((el: IYearlyStatisticsResponse) => el.expenses) : [0,0,0,0,0,0,0,0,0,0,0,0],
            backgroundColor: "#FF4B4A",
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio : false,
        plugins: {
          legend: {
            align: "end" as const,
            position: "top" as const,
          },
        },
      }}
      className='w-full h-full'
      aria-label="Transactions yearly statistics(current year)"
    />
  );
}
