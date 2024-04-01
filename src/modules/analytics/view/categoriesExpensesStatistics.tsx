
"use client";
import "chart.js/auto";
import {Doughnut} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {hexToRgba} from "@/controllers/colors";
import {useGetCategoriesExpensesStatistics} from "../hooks/getCategoriesExpensesStatistics";
import {ICategoriesExpensesStatisticsFilters, ICategoriesExpensesStatisticsResponse} from "../types/categoriesExpensesStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: ICategoriesExpensesStatisticsFilters;
}

export function CategoriesExpensesStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetCategoriesExpensesStatistics(filters, session.jwt);

  if(!data?.data || Object.keys(data.data).length === 0) return <p className="text-danger text-[24px] font-bold">No Data</p>;

  return (
    <Doughnut
      data={{
        datasets: [
          {
            borderWidth: 1,
            label: "expenses",
            data: Object.values(data.data).map((el: ICategoriesExpensesStatisticsResponse) => el.amount),
            borderColor: Object.values(data.data).map((el: ICategoriesExpensesStatisticsResponse) => el.color),
            backgroundColor: Object.values(data.data).map((el: ICategoriesExpensesStatisticsResponse) => hexToRgba(el.color, 0.25)),
          },
        ],
        labels: Object.values(data.data).map((el: ICategoriesExpensesStatisticsResponse) => el.label),
      }}
      options={{
        responsive: true,
        maintainAspectRatio : false,
        plugins: {
          legend: {
            display: false
          }
        }
      }}
      className='w-full h-full'
      aria-label="Expenses statistics(current month)"
    />
  );
}
