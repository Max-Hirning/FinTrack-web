"use client";

import "chart.js/auto";
import {Bar} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {getMonthName} from "@/controllers/dates";
import {useGetMonthlyExpenses} from "../hooks/getMonthlyExpenses";
import {IMonthlyExpensesStatisticsFilters} from "../types/monthlyExpensesStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: IMonthlyExpensesStatisticsFilters;
}

export function MonthlyExpensesStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetMonthlyExpenses(filters, session.jwt);

  return (
    <Bar
      data={{
        labels: (data?.data) ? Object.keys(data.data).map((el: string) => getMonthName(el)) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Expenses",
            data: (data?.data) ? Object.values(data.data) : [0,0,0,0,0,0],
            backgroundColor: "#16DBCC",
            borderRadius: 5,
          },
        ],
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
