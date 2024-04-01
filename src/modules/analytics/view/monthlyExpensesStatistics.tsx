"use client";

import "chart.js/auto";
import {Bar} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {getMonthName} from "@/controllers/dates";
import {IMonthlyExpensesStatisticsFilters} from "../types/monthlyExpensesStatistics";
import {useGetMonthlyExpensesStatistics} from "../hooks/getMonthlyExpensesStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: IMonthlyExpensesStatisticsFilters;
}

export function MonthlyExpensesStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetMonthlyExpensesStatistics(filters, session.jwt);
  // eslint-disable-next-line no-console
  console.log(data?.data);
  if(!data?.data || Object.values(data.data).length === 0) return <p className="text-danger text-[24px] font-bold">No Data</p>;

  return (
    <Bar
      data={{
        datasets: [
          {
            borderRadius: 5,
            label: "Expenses",
            backgroundColor: "#16DBCC",
            data: Object.values(data.data),
          },
        ],
        labels: Object.keys(data.data).map((el: string) => getMonthName(el)),
      }}
      options={{
        responsive: true,
        maintainAspectRatio : false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
          y: {
            type: "linear",
            display: false,
            position: "left"
          },
        },
        plugins: {
          legend: {
            display: false
          },
        },
      }}
      className='w-full h-full'
      aria-label="Expenses monthly statistics(current year)"
    />
  );
}
