"use client";

import "chart.js/auto";
import {Doughnut} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {hexToRgba} from "@/controllers/colors";
import {useGetCardsExpensesStatistics} from "../hooks/getCardsExpensesStatistics";
import {ICardsExpensesStatisticsFilters, ICardsExpensesStatisticsResponse} from "../types/cardsExpensesStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: ICardsExpensesStatisticsFilters;
}

export function CardsExpensesStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetCardsExpensesStatistics(filters, session.jwt);

  if(!data?.data || Object.keys(data.data).length === 0) return <p className="text-danger text-[24px] font-bold">No Data</p>;

  return (
    <Doughnut
      data={{
        datasets: [
          {
            borderWidth: 1,
            label: "expenses",
            data: Object.values(data.data).map((el: ICardsExpensesStatisticsResponse) => el.amount),
            borderColor: Object.values(data.data).map((el: ICardsExpensesStatisticsResponse) => el.color),
            backgroundColor: Object.values(data.data).map((el: ICardsExpensesStatisticsResponse) => hexToRgba(el.color, 0.25)),
          },
        ],
        labels: Object.values(data.data).map((el: ICardsExpensesStatisticsResponse) => el.label),
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
      aria-label="Card expenses statistics(current month)"
    />
  );
}
